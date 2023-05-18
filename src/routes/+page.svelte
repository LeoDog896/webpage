<script lang="ts">
	import type { PageData } from './$types';
	import { filename } from '$lib/filename';

	$filename = '/src/routes/+page.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>leo</title>
	<meta name="description" content="leo's personal blog" />
	<meta
		name="keywords"
		content="LeoDog896, tech, blog, coding, programming">
	<link rel="canonical" href="https://www.leodog896.com/" />

	<!-- Open Graph Meta Tags -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="leodog896.com" />
	<meta property="og:description" content="leo's personal blog" />
	<meta property="og:url" content="https://www.leodog896.com/" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="leodog896.com" />
	<meta name="twitter:description" content="leo's personal blog" />
</svelte:head>

{#each data.stuff as { name, description, href, type }}
	<div class="item">
		<h2>
			<a {href} class={`link-${type}`} title={name + " >>>"}>{name} &gt;&gt;&gt;</a>
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
		font-size: 1.5rem;
		content: attr(title);

		@mixin background-handler($selector, $color) {
			&.#{$selector} {
				color: $color;
				position: relative;

				&:hover::after {
					width: 100%;
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
