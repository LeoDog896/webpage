<!-- if you go through the source to get all the privileges i mean. feel free to i guess. i surely am not that interesting -->

<script lang="ts" module>
	import { persisted, type Persisted } from 'svelte-persisted-store';
	import { derived as derivedStore, get, type Readable } from 'svelte/store';

	export interface Privilege {
		id: string;
		value: number;
		title: string;
	}

	export let allUuidsLength = 7;

	export const uuids: Persisted<string[]> = persisted('uuids', []);
	export const optedOut: Persisted<boolean> = persisted('optedOut', false);

	export const uuidSet: Readable<Set<string>> = derivedStore(
		[uuids, optedOut],
		([$uuids, $optedOut]) =>
			$optedOut
				? new Set(Array.from({ length: allUuidsLength }, (_, i) => i.toString(36)))
				: new Set($uuids)
	);

	// violating dry every day !

	export const currentPrivileges = derivedStore(uuidSet, ($uuidSet) =>
		privileges.filter(({ value }) => value <= $uuidSet.size).sort((a, b) => a.value - b.value)
	);

	export const bestPrivilege = derivedStore(currentPrivileges, ($currentPrivileges) =>
		$currentPrivileges.length > 0 ? $currentPrivileges.at(-1) : null
	);

	export const nextPrivileges = derivedStore(uuidSet, ($uuidSet) =>
		privileges.filter(({ value }) => $uuidSet.size < value).sort((a, b) => a.value - b.value)
	);

	export const nextPrivilege = derivedStore(nextPrivileges, ($nextPrivileges) =>
		$nextPrivileges.length > 0 ? $nextPrivileges[0] : null
	);

	export const privileges = [
		{ id: 'info', value: 1, title: 'View Personal Contact Links' },
		{ id: 'technicalPosts', value: 2, title: 'View Technical Posts' },
		{ id: 'allPosts', value: 5, title: 'View All Non-Exclusive Posts' },
		{ id: 'annoyances', value: 10, title: 'View Annoyances' }
	] as const satisfies Privilege[];

	export type PrivilegeId = (typeof privileges)[number]['id'];

	export function hasPrivilege(privileges: Privilege[], id: PrivilegeId): boolean {
		if (get(optedOut)) return true;

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
	let hasBeenClicked = $derived($uuids.includes(id) || $optedOut);

	let clickX = $state(0);
	let clickY = $state(0);
</script>

<button
	class={[{ accent: !hasBeenClicked }]}
	onclick={event => {
		$uuids = [...$uuids, id];
		hasJustBeenClicked = true;
		clickX = event.clientX + window.scrollX;
		clickY = event.clientY + window.scrollY;
	}}
	disabled={hasBeenClicked}
	tabindex={hasBeenClicked ? -1 : 0}
>
	<slot />
	<div class="confetti" style:top={`${clickY}px`} style:left={`${clickX}px`}>
		{#if hasJustBeenClicked}
			<Confetti
				y={[-0.5, 0.5]}
				x={[-0.5, 0.5]}
				colorRange={[30, 50]}
				amount={20}
				fallDistance="0px"
				duration={3000}
				size={4}
			/>
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

		&.accent {
			color: oklch(76.75% 0.1515 65.49);
			text-decoration: underline;
		}

		&:disabled {
			cursor: text;
			user-select: text;
		}
	}

	.confetti {
		position: absolute;
		transform: translate(-50%, -50%);
	}
</style>
