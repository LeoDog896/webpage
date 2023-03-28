<script>
	import '../app.scss';
	import { filename } from '$lib/filename';
	import Header from '$lib/Header.svelte';
</script>

<svelte:head>
	<title>leo</title>
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
