<script lang="ts">
	import '@fontsource-variable/inter';
	import '../app.scss';
	import Footer from '$lib/Footer.svelte';
	import { onMount } from 'svelte';
	import { uuids, uuidSet } from '$lib/Treasure.svelte';

	onMount(() => {
		(window as unknown as any)['giveUp'] = () => {
			uuids.set([]);
		};

		let subscriber: (() => void) | null = null;
		subscriber = uuidSet.subscribe((value) => {
			if (value.size > 0) {
				console.log('please dont circumvent my beautiful quirky little feature :(');
				console.log('i do try to make sure that the Big Orange Link-Buttons are quite obvious.');
				console.log("honestly if anything you can just tab them. i didn't remove the tab index");
				console.log('also?? there is an opt out button??? ??????');
				console.log()
				console.log('also, if you want to reset your progress, you can use the global `giveUp` function!')
				subscriber?.();
			}
		});
	});
</script>

<main>
	<slot />
</main>

<Footer />

<style>
	main {
		max-width: 80ch;
		padding: 2ch;
		margin: 0 auto;
	}
</style>
