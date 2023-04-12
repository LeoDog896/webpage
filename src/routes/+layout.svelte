<script>
	import '../app.scss';
	import { filename } from '$lib/filename';
	import Header from '$lib/Header.svelte';
</script>

<svelte:head>
	<!-- these tags are applied to all pages -->
	<meta name="author" content="Tristan F" />
	<!-- change this to theme color of your website; changes Discord embed color
	<meta name="theme-color" content="#08608c" />-->
	<meta name="robots" content="index, follow" />
	<meta name="publisher" content="Tristan F" />
</svelte:head>

<Header />

<main>
	<slot />
</main>

<footer class="edit-banner">
	<i
		>this page is open source. found a typo? <a
			href="https://github.com/LeoDog896/webpage/blob/main{$filename}">edit it!</a
		></i
	>
</footer>

<style>
	.edit-banner {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #eee;
		padding: 10px;
		text-align: center;
		font-size: 0.8em;
	}

	main {
		margin-bottom: 4rem;
		max-width: 80ch;
		padding: 0 2ch;
	}
</style>
