<script module>
	import img from './ImgComponent.svelte';
	export { img };
</script>

<script>
	// https://github.com/pngwn/MDsveX/issues/485

	/** @type {string} */
	export let title;

	/** @type {string} */
	export let description;

	/** @type {string} */
	export let emojis;

	/** @type {string} */
	export let slug;

	/** @type {string} */
	export let type;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Meta Tags -->
	<meta name="description" content={description} />
	<link rel="canonical" href="https://leodog896.com/article/{slug}" />

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

<h1>{title}</h1>
<h2>{description}</h2>

<slot />

<style>
	h1 {
		text-align: center;
		margin-bottom: 0;
	}

	h2 {
		margin-top: 0;
		text-align: center;
		font-size: 1rem;
	}
</style>
