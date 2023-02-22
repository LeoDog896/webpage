<script lang="ts">
	import EmojiSelector from "$lib/EmojiSelector.svelte";

	interface Link {
		name: string;
		href: string;
	}

	interface DescriptiveLink extends Link {
		description: string;
		type: 'project' | 'security' | 'article';
	}

	const links: Link[] = [
		{
			name: 'so',
			href: 'https://stackoverflow.com/users/7589775/leodog896'
		},
		{
			name: 'gh',
			href: 'https://github.com/LeoDog896'
		},
		{
			name: 'discord',
			href: 'https://discord.com/users/LeoDog896#0675'
		},
		{
			name: 'email',
			href: 'mailto:leodog896@gmail.com'
		}
	];

	const stuff: DescriptiveLink[] = [
		{
			name: "Godot + Jigsaws",
			description: "setting up a jigsaw puzzle game in Godot",
			href: "article/godot-jigsaw/",
			type: "article" 
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
		},
	];
</script>

<h1>
	leo
	<EmojiSelector emojis={['🌼', '✨', '🍚']}></EmojiSelector>
</h1>
<p>making && breaking things on the internet</p>
<p>
	{#each links as { name, href }, i}
		<a {href}>{name}</a>
		{#if i < links.length - 1}
			<span> | </span>
		{/if}
	{/each}
</p>

{#each stuff as { name, description, href, type }}
	<div class="item">
		<a {href} class={`link-${type}`}>
			<h2>{name}</h2>
		</a>
		<p><i>{description}</i></p>
	</div>
{/each}

<style lang="scss">
	.item {
		border: 1px dotted #aaa;
		padding: 10px;

		h2 {
			margin: 0;
		}

		p {
			margin-bottom: 0;
		}

		&:not(:last-child) {
			margin-bottom: 10px;
		}

		a {
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
</style>
