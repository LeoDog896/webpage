<!-- if you go through the source to get all the privileges i mean. feel free to i guess. i surely am not that interesting -->

<script lang="ts" module>
    import { persisted, type Persisted } from 'svelte-persisted-store'
    import { derived as derivedStore, type Readable } from 'svelte/store';

    export interface Privilege {
        id: string;
        value: number;
        title: string;
    }

    export let allUuidsLength = 5;

    export const uuids: Persisted<string[]> = persisted('uuids', []);
    export const uuidSet: Readable<Set<string>> = derivedStore(uuids, $uuids => new Set($uuids));
    
    export const currentPrivileges = derivedStore(
        uuidSet,
        $uuidSet => privileges.filter(({ value }) => value <= $uuidSet.size).sort((a, b) => a.value - b.value)
    );

    export const bestPrivilege = derivedStore(
        currentPrivileges,
        $currentPrivileges => $currentPrivileges.length > 0 ? $currentPrivileges.at(-1) : null
    );

    export const nextPrivileges = derivedStore(
        uuidSet,
        $uuidSet => privileges.filter(({ value }) => $uuidSet.size < value).sort((a, b) => a.value - b.value)
    );

    export const nextPrivilege = derivedStore(
        nextPrivileges,
        $nextPrivileges => $nextPrivileges.length > 0 ? $nextPrivileges[0] : null
    );

    export const privileges = [
        { id: "info", value: 1, title: "View Personal Contact Links" },
        { id: "technicalPosts", value: 2, title: "View Technical Posts" },
        { id: "allPosts", value: 5, title: "View All Non-Exclusive Posts" },
        { id: "annoyances", value: 10, title: "View Annoyances" },
    ] as const satisfies Privilege[];

    type PrivilegeId = (typeof privileges)[number]['id'];

    export function hasPrivilege(
        privileges: Privilege[],
        id: PrivilegeId
    ): boolean {
        return privileges.some(({ id: privilegeId }) => privilegeId === id);
    }
</script>

<script lang="ts">
    import Confetti from 'svelte-confetti';

    interface Props {
		// honestly its best not to think about this too much
        id: string;
	}

	let { id }: Props = $props();

    let hasJustBeenClicked = $state(false);
    let showConfetti = $derived($uuids.includes(id));
</script>

<button class={[{ accent: !showConfetti }]} onclick={() => {
    $uuids = [...$uuids, id];
    hasJustBeenClicked = true;
}}>
    <slot />
    <div class="confetti">
        {#if hasJustBeenClicked}
            <Confetti y={[-0.5, 0.5]} x={[-0.5, 0.5]} colorRange={[30, 50]} amount={20} fallDistance="0px" duration={3000} size={4} />
        {/if}
    </div>
</button>

<style lang="scss"> 
    button {
        /* reset style */
        background: none;
        border: none;
        font: inherit;
        cursor: pointer;
        color: inherit;
        display: inline;
        padding: 0;
        position: relative;

        &.accent {
            color: oklch(76.75% 0.1515 65.49);
            text-decoration: underline;
        }
    }

    .confetti {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
