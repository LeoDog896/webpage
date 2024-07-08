<script>
	import '@fontsource-variable/jetbrains-mono';
	import '../app.scss';
	import { filename } from '$lib/filename';
	import Header from '$lib/Header.svelte';

	export let data;
</script>

<svelte:head>
	<meta name="author" content="Tristan F." />
	<meta name="theme-color" content="#B5D6AF" />
	<meta name="robots" content="index, follow" />
	<meta name="publisher" content="Tristan F." />
</svelte:head>

<Header />

<main>
	<slot />
</main>
<footer>
	<i
		>this site is open source. found a typo? <a
			href="https://github.com/LeoDog896/webpage/blob/main{$filename}">edit it!</a
		></i
	>
</footer>

<style>
	footer {
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

	@media (prefers-color-scheme: dark) {
		footer {
			background: #333;
			color: white;
		}
	}
</style>
