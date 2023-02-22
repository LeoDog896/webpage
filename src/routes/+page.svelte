<script lang="ts">
	import { filename } from '$lib/filename';

	$filename = '/src/routes/+page.svelte';

	interface DescriptiveLink {
		name: string;
		href: string;
		description: string;
		type: 'project' | 'security' | 'article';
	}

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

{#each stuff as { name, description, href, type }}
	<div class="item">
		<a {href} class={`link-${type}`}>
			<h2>{name}</h2>
		</a>
		<p><i>{description}</i></p>
	</div>
{/each}

<style lang="scss">
	h2 {
		font-weight: 400;
	}

	a,
	p {
		font-weight: 300;
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
</style>
