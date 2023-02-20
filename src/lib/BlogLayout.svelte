<script>
	// https://github.com/pngwn/MDsveX/issues/485

	/** @type {string} */
	export let title

	/** @type {string} */
	 export let description
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<slot/>