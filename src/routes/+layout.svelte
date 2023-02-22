<script>
	import '../app.css';
	import 'prism-themes/themes/prism-material-oceanic.css';
	const filename = new URL(import.meta.url).pathname;
</script>

<svelte:head>
	<title>leo</title>
</svelte:head>

<slot />

<i>this page is open source. found a typo? <a 
	href="https://github.com/LeoDog896/webpage/blob/main{filename}"
>edit it!</a></i>