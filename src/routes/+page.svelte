<script lang="ts">
	import type { PageData } from './$types';
	import { filename } from '$lib/filename';

	$filename = '/src/routes/+page.svelte';

	export let data: PageData;

	let metaDescription =
		"hi! i'm leo. i code a lot! particurally in either rust, typescript, and/or svelte. i also like ferrets and cats 🐈";
</script>

<svelte:head>
	<title>leo</title>
	<meta name="description" content={metaDescription} />
	<meta name="keywords" content="LeoDog896, tech, blog, coding, programming" />
	<link rel="canonical" href="https://www.leodog896.com/" />

	<!-- Open Graph Meta Tags -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="leodog896.com" />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:url" content="https://www.leodog896.com/" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="leodog896.com" />
	<meta name="twitter:description" content={metaDescription} />
</svelte:head>

<section id="bio">
	<h1>hi! i'm leo.</h1>
	<p>
		i code a lot! particurally in either rust, <br />typescript, and/or svelte. i also like ferrets
		and cats 🐈
	</p>
</section>

{#each data.stuff as { name, description, href, type }}
	<div class="item">
		<h2>
			<a {href} class={`link-${type}`} title={name + ' >>>'} aria-label={name}>{name}</a>
		</h2>
		<p><i>{description}</i></p>
	</div>
{/each}

<style lang="scss">
	#bio {
		margin-top: 2rem;
		border: 1px solid #eee;
		padding: 1rem;
		display: inline-block;
	}

	#bio h1 {
		margin: 0;
		font-weight: 400;
	}

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

	@media (prefers-color-scheme: dark) {
		.item {
			color: white;
		}
	}

	a {
		font-size: 1.5rem;
		content: attr(title);

		@mixin background-handler($selector, $color) {
			&.#{$selector} {
				color: $color;
				position: relative;

				&:hover::after {
					// we add an extra few pixels here to account for the hover effect.
					// This is a variable amount of characters since the font here isn't
					// monospace.
					width: calc(100% + 3.3ch);
					bottom: -1px;
				}

				&::after {
					font-size: 1.5rem;
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
