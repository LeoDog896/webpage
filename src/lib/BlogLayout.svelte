<script context="module">
	import img from './ImgComponent.svelte';
	export { img };
</script>

<script>
	import EmojiSelector from './EmojiSelector.svelte';
	import { filename } from '$lib/filename';

	// https://github.com/pngwn/MDsveX/issues/485

	/** @type {string} */
	export let title;

	/** @type {string} */
	export let emoji;

	/** @type {string} */
	export let slug;

	$filename = `/src/routes/miniblog/${slug}/+page.md`;

	$: description = `${emoji} - on ${title}; a mini blog post by leo`
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Meta Tags -->
	<meta name="description" content={description} />
	<link rel="canonical" href="https://leodog896.com/article/{slug}" />
	<meta
		name="keywords"
		content="blog, tech, programming, coding, programming article, article, post, LeoDog896"
	/>

	<!-- Open Graph Meta Tags -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content="https://leodog896.com/article/{slug}" />
	<meta property="og:site_name" content="leodog896.com" />
	<meta property="og:locale" content="en_US" />
	<meta property="article:author" content="Tristan F." />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:url" content="https://leodog896.com/article/{slug}" />
</svelte:head>

<h1>{title} <EmojiSelector emojis={[emoji]} /></h1>
<h2>a mini blogpost</h2>

<slot />

<style>
	h1 {
		text-align: center;
		margin-bottom: 0;
		color: rgb(180, 11, 222);
	}

	h2 {
		margin-top: 0;
		text-align: center;
		color: rgba(0, 0, 0, 0.7);
		font-size: 1rem;
	}

	@media (prefers-color-scheme: dark) {
		h1 {
			color: white;
		}

		h2 {
			color: rgba(255, 255, 255, 0.7);
		}
	}
</style>
