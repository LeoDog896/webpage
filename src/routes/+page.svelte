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
			<a {href} class={`link-${type}`}>
				<span class="name">{name}</span>
				<span class="boost">>>></span>
			</a>
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
				background-size: 200% 100%;
				background-image: 
					linear-gradient(to right, #{$color} 50%, white 50%),
                    linear-gradient(to right, white 50%, #{$color} 50%);
				background-clip: text, border-box, padding-box;
				transition: background-position 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
				-webkit-background-clip: text, border-box, padding-box;
				color: transparent;
				background-origin: border-box;

				// this ensures that the border doesn't show up when the link is hovered
				border-bottom: 1px dotted transparent;

				.name {
					border-bottom: 1px dotted $color;
				}

				&:hover {
					background-position: -100% 0;
				}

				&:hover .boost {
					opacity: 1;
				}
			}
		}

		.boost {
			color: #fff;
			opacity: 0;
			transition: opacity 0.2s ease-in-out;
		}

		margin-bottom: 0;
		margin-top: 2rem;

		@include background-handler(link-project, rgb(11, 92, 222));
		@include background-handler(link-security, rgb(199, 8, 8));
		@include background-handler(link-article, rgb(154, 16, 219));

		width: fit-content;
	}
</style>
