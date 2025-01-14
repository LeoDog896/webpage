<script lang="ts">
    import { uuidSet, allUuidsLength } from '$lib/Treasure.svelte';
	import { quadInOut } from 'svelte/easing';
    import { Tween } from 'svelte/motion';

    const progress = $derived(($uuidSet.size / allUuidsLength) * 100);

	const tween = Tween.of(() => progress, { easing: quadInOut });
</script>

<footer>
    <div class="bar" style:width={tween.current + '%'}></div>
</footer>

<style lang="scss">
    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
    }

    .bar {
        background-color: oklch(76.75% 0.1515 65.49);
        height: 1ch;
    }
</style>
