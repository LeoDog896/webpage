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
			name: "twice-around ansi injection in deno",
			description: "permission prompts are wonderful, but the modern terminal is powerful too.",
			href: "article/deno-ansi-injection",
			type: 'security'
		},
		{
			name: 'Godot + Jigsaws',
			description: 'setting up a jigsaw puzzle game in Godot',
			href: 'article/godot-jigsaw',
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
		<h2>
			<!-- svelte-ignore a11y-missing-content -->
			<a {href} class={`link-${type}`} title={name + " >>>"} aria-label={name}></a>
		</h2>
		<p><i>{description}</i></p>
	</div>
{/each}

<style lang="scss">
	h2 {
		margin: 0;
		margin-top: 1.5rem;
		font-weight: 400;
	}

	p {
		margin-bottom: 0;
		margin-top: 0.5rem;
	}

	.item:not(:last-child) {
		margin-bottom: 10px;
	}

	a {
		@mixin background-handler($selector, $color) {
			&.#{$selector} {
				position: relative;

				&:hover::after {
					width: 100%;
					bottom: -1px;
				}

				// apply bottom: -1px also not during hover as well.

				&::after {
					width: 0;
					bottom: -1px;
				}

				&:before {
					content: attr(title);
					color: $color;
				}

				&::after {
					content: attr(title);
					position: absolute;
					left: 0;
					width: 0;
					top: 0;
					bottom: 0;
					color: white;
					transition: width 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
					background-color: $color;
					white-space: nowrap;
					overflow: hidden;
				}

				text-decoration: none;
				border-bottom: 1px dotted $color;
			}
		}
		
		margin-bottom: 0;
		margin-top: 2rem;

		@include background-handler(link-project, rgb(11, 92, 222));
		@include background-handler(link-security, rgb(199, 8, 8));
		@include background-handler(link-article, rgb(154, 16, 219));

		width: fit-content;
	}
</style>
