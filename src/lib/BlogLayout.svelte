<script>
	import EmojiSelector from './EmojiSelector.svelte';
	import { filename } from '$lib/filename';
	// https://github.com/pngwn/MDsveX/issues/485

	/** @type {string} */
	export let title;

	/** @type {string} */
	export let description;

	/** @type {string} */
	export let emojis;

	/** @type {string} */
	export let slug;

	$filename = `/src/routes/article/${slug}/+page.md`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<main>
	<h1>{title} <EmojiSelector emojis={emojis.split(' ')} /></h1>

	<slot />
</main>

<style>
	main {
		margin-bottom: 4rem;
	}
</style>
