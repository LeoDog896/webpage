<script>
	import '../app.scss';
	import { filename } from '$lib/filename';
	import Header from '$lib/Header.svelte';
	import { fade } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';

	export let data;

	$: pathname = data.pathname;
</script>

<svelte:head>
	<meta name="author" content="Tristan F." />
	<meta name="theme-color" content="#B5D6AF" />
	<meta name="robots" content="index, follow" />
	<meta name="publisher" content="Tristan F." />
</svelte:head>

<Header />

{#key pathname}
	<main
		in:fade={{ easing: cubicOut, duration: 300, delay: 400 }}
		out:fade={{ easing: cubicIn, duration: 300 }}
	>
		<slot />
	</main>
{/key}

<footer class="edit-banner">
	<i
		>this page is open source. found a typo? <a
			href="https://github.com/LeoDog896/webpage/blob/main{$filename}">edit it!</a
		></i
	>
	otherwise, <a href="/feed">subscribe to my blog!</a>
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

	@media (prefers-color-scheme: dark) {
		.edit-banner {
			background: #333;
			color: white;
		}
	}
</style>
