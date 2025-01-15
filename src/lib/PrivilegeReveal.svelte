<script lang="ts">
	import { currentPrivileges, hasPrivilege, type PrivilegeId } from "./Treasure.svelte";

	interface Props {
		id: PrivilegeId;
	}

	let { id }: Props = $props();
</script>

{#if hasPrivilege($currentPrivileges, id)}
	<slot />
{/if}
