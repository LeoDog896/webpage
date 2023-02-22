<script lang="ts">
	import EmojiSelector from '$lib/EmojiSelector.svelte';
	import type { ComponentType, SvelteComponentTyped } from 'svelte';

	import DiStackoverflow from 'svelte-icons/di/DiStackoverflow.svelte';
	import DiGithubBadge from 'svelte-icons/di/DiGithubBadge.svelte';
	import FaDiscord from 'svelte-icons/fa/FaDiscord.svelte';
	import IoIosMail from 'svelte-icons/io/IoIosMail.svelte';

	const links: { icon: ComponentType<SvelteComponentTyped>; href: string }[] = [
		{
			icon: DiStackoverflow,
			href: 'https://stackoverflow.com/users/7589775/leodog896'
		},
		{
			icon: DiGithubBadge,
			href: 'https://github.com/LeoDog896'
		},
		{
			icon: FaDiscord,
			href: 'https://discord.com/users/LeoDog896#0675'
		},
		{
			icon: IoIosMail,
			href: 'mailto:leodog896@gmail.com'
		}
	];
</script>

<h1>
	<a class="title" href="/">leo</a>
	<EmojiSelector style="margin: 0 0.5rem;" emojis={['🌼', '✨', '🍚']} />
	<span class="subtitle">making && breaking tech</span>

	<span class="icons">
		{#each links as { icon, href }}
			<a class="icon" {href}>
				<svelte:component this={icon} />
			</a>
		{/each}
	</span>
</h1>

<style>
	.title {
		color: rgb(11, 92, 222);
		text-decoration: none;
	}

	h1 {
		margin-bottom: 0px;
		padding-bottom: 1rem;
		border-bottom: 1px solid #ccc;
	}

	h1,
	h2 {
		font-weight: 400;
	}

	.icon {
		width: 25px;
		height: 25px;
		margin-right: 10px;
		display: inline-block;
	}

	.icons {
		float: right;
	}

	.subtitle {
		font-size: 0.5em;
	}
</style>
