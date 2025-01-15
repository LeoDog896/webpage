<script lang="ts">
	import type { Snippet } from "svelte";
	import { currentPrivileges, hasPrivilege, type PrivilegeId } from "./Treasure.svelte";

	interface Props {
		id: PrivilegeId;
		children: Snippet
	}

	let { id, children }: Props = $props();
</script>

{#if hasPrivilege($currentPrivileges, id)}
	{@render children?.()}
{/if}
