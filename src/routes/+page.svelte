<script lang="ts">
	import EmojiSelector from '$lib/EmojiSelector.svelte';
	import { filename } from '$lib/filename';
	import type { ComponentType, SvelteComponentTyped } from "svelte";

	import DiStackoverflow from 'svelte-icons/di/DiStackoverflow.svelte';
	import DiGithubBadge from 'svelte-icons/di/DiGithubBadge.svelte';
	import FaDiscord from 'svelte-icons/fa/FaDiscord.svelte'
	import IoIosMail from 'svelte-icons/io/IoIosMail.svelte'

	$filename = "/src/routes/+page.svelte"

	interface DescriptiveLink {
		name: string;
		href: string;
		description: string;
		type: 'project' | 'security' | 'article';
	}

	const links: { icon: ComponentType<SvelteComponentTyped>, href: string }[] = [
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

	const stuff: DescriptiveLink[] = [
		{
			name: 'Godot + Jigsaws',
			description: 'setting up a jigsaw puzzle game in Godot',
			href: 'article/godot-jigsaw/',
			type: 'article'
		},
		{
			name: 'CVE-2023-22499',
			description: 'my first reported security vulnerability!',
			href: 'https://github.com/denoland/deno/security/advisories/GHSA-mc52-jpm2-cqh6',
			type: 'security'
		},
		{
			name: 'deno-outdated',
			description: 'a tool to check for outdated dependencies in your deno project',
			href: 'https://github.com/LeoDog896/deno-outdated',
			type: 'project'
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
				<svelte:component this={icon}></svelte:component>
			</a>
		{/each}
	</span>
</h1>

{#each stuff as { name, description, href, type }}
	<div class="item">
		<a {href} class={`link-${type}`}>
			<h2>{name}</h2>
		</a>
		<p><i>{description}</i></p>
	</div>
{/each}

<style lang="scss">
	.title {
		color: rgb(11, 92, 222);
		text-decoration: none;
	}

	h1 {
		margin-bottom: 0px;
		padding-bottom: 1rem;
		border-bottom: 1px solid #ccc;
	}

	a, p {
		font-weight: 300;
	}

	h1, h2 {
		font-weight: 400;
	}

	.item {

		h2 {
			margin: 0;
		}

		p {
			margin-bottom: 0;
		}

		&:not(:last-child) {
			margin-bottom: 10px;
		}

		p {
			margin-top: 0.5rem;
		}

		a {

			h2 {
				margin-bottom: 0;
				margin-top: 2rem;
			}

			&.link-project {
				color: rgb(11, 92, 222);
			}

			&.link-security {
				color: rgb(138, 0, 0);
			}

			&.link-article {
				color: rgb(154, 16, 219);
			}
		}
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
