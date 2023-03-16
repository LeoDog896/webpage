<script lang="ts">
	import EmojiSelector from '$lib/EmojiSelector.svelte';
	import type { ComponentType, SvelteComponentTyped } from 'svelte';

	import DiStackoverflow from 'svelte-icons/di/DiStackoverflow.svelte';
	import DiGithubBadge from 'svelte-icons/di/DiGithubBadge.svelte';
	import FaDiscord from 'svelte-icons/fa/FaDiscord.svelte';
	import IoIosMail from 'svelte-icons/io/IoIosMail.svelte';

	const links: {
		icon: ComponentType<SvelteComponentTyped>;
		href: string;
		label: string;
	}[] = [
		{
			icon: DiStackoverflow,
			href: 'https://stackoverflow.com/users/7589775/leodog896',
			label: 'Stack Overflow'
		},
		{
			icon: DiGithubBadge,
			href: 'https://github.com/LeoDog896',
			label: 'GitHub'
		},
		{
			icon: FaDiscord,
			href: 'https://discord.com/users/208734037018279937',
			label: 'Discord'
		},
		{
			icon: IoIosMail,
			href: 'mailto:leodog896@gmail.com',
			label: 'Email'
		}
	];
</script>

<header>
	<h1>
		<EmojiSelector style="margin: 0 0.5rem;" emojis={['🌼', '✨', '🍚']} />
		<a class="title" href="/">leo</a>
	</h1>
	<h2>making <span class="and"><a target="_blank" rel="noreferrer" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND">&&</a></span> breaking tech</h2>

	<div class="icons">
		{#each links as { icon, href, label }, i}
			<a aria-label={label} class="icon" style="--rotate: {i * 4 - (links.length - 1) * 2}deg;" {href}>
				<svelte:component this={icon} />
			</a>
		{/each}
	</div>
</header>

<style lang="scss">
	.and {
		padding: 0 0.2rem;
		background-color: #fff;
		color: #000;
		border-bottom: 1px solid #ccc;
		&:hover {
			background-color: #000;
			color: #fff;
		}
	}

	.and a {
		text-decoration: none;
		color: inherit;
	}

	.icon {
		transition: transform 0.2s ease-in-out;
		transform-origin: 50% 100%;
		width: 25px;
		height: 25px;
		margin-right: 10px;
		display: inline-block;

		&:hover {
			opacity: 0.5;
			transform: rotate(var(--rotate));
			transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
		}
	}

	.title {
		text-decoration: none;
	}

	header {
		max-width: 80ch;
		width: 100%;
		margin-bottom: 0px;
		padding: 1rem 0rem;
		border-bottom: 1px solid #ccc;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	@media (max-width: 600px) {
		h2 {
			display: none;
		}
	}

	h1 {
		font-weight: 400;
	}

	h2 {
		font-weight: 300;
		font-size: 1.2rem;
		margin: 0;
	}
</style>
