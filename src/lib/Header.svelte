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
			href: 'https://discord.com/users/LeoDog896#0675',
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
		<div>
			<EmojiSelector style="margin: 0 0.5rem;" emojis={['🌼', '✨', '🍚']} />
			<a class="title" href="/">leo</a>
		</div>
		<span class="subtitle">making <span class="and">&&</span> breaking tech</span>

		<span class="icons">
			{#each links as { icon, href, label }, i}
				<a aria-label={label} class="icon" style="--rotate: {i * 4 - (links.length - 1) * 2}deg;" {href}>
					<svelte:component this={icon} />
				</a>
			{/each}
		</span>
	</h1>
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

	.icon {
		transition: transform 0.2s ease-in-out;
		transform-origin: 50% 100%;

		&:hover {
			opacity: 0.5;
			transform: rotate(var(--rotate));
			transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
		}
	}

	.title {
		text-decoration: none;
	}

	h1 {
		margin-bottom: 0px;
		padding: 0 1rem 1rem;
		border-bottom: 1px solid #ccc;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	@media (max-width: 600px) {
		.subtitle {
			display: none;
		}
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

		// ensure icons don't get cut off
		vertical-align: middle;
	}

	.subtitle {
		font-size: 0.5em;
	}
</style>
