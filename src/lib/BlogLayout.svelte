<script>
	import EmojiSelector from './EmojiSelector.svelte';
	// https://github.com/pngwn/MDsveX/issues/485

	/** @type {string} */
	export let title;

	/** @type {string} */
	export let description;

	/** @type {string} */
	export let emojis;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<h1>{title} <EmojiSelector emojis={emojis.split(' ')} /></h1>

<slot />
