<script lang="ts">
	import { linear, quadOut } from "svelte/easing";
	import { currentPrivileges, hasPrivilege, type PrivilegeId } from "./Treasure.svelte";
	import { fly } from "svelte/transition";

	interface Props {
		id: PrivilegeId;
	}

	let { id }: Props = $props();
</script>

{#if hasPrivilege($currentPrivileges, id)}
	<div in:fly={{ easing: quadOut, duration: 800, x: 10 }}>
		<slot />
	</div>
{/if}
