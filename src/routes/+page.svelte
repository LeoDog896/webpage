<script lang="ts">
	interface Link {
		name: string;
		href: string;
	}

	interface DescriptiveLink extends Link {
		description: string;
	}

	const links: Link[] = [
		{
			name: "so",
			href: "https://stackoverflow.com/users/7589775/leodog896"
		},
		{
			name: "gh",
			href: "https://github.com/LeoDog896"
		},
		{
			name: "discord",
			href: "https://discord.com/users/LeoDog896#0675"
		},
		{
			name: "email",
			href: "mailto:leodog896@gmail.com"
		}
	]

	const favoriteEmojis = ["🌼", "✨", "🍚"]

	const randomEmoji = (exceptForIndex = -1): string => {
		const index = Math.floor(Math.random() * favoriteEmojis.length)
		if (index === exceptForIndex) return randomEmoji(exceptForIndex)
		return favoriteEmojis[index]
	}

	const refreshEmoji = () => {
		currentEmoji = randomEmoji(favoriteEmojis.indexOf(currentEmoji))
	}

	let currentEmoji = randomEmoji()

	const stuff: DescriptiveLink[] = [
		{
			name: "CVE-2023-22499",
			description: "my first reported security vulnerability! hope to find more.",
			href: "https://github.com/denoland/deno/security/advisories/GHSA-mc52-jpm2-cqh6"
		}
	]
</script>

<h1>leo 
	<button class="text-like"
		on:click={refreshEmoji}
		on:keypress={refreshEmoji}
	>{currentEmoji}</button>
</h1>
<p>i make & break things on computers</p>
<p>
	{#each links as { name, href }, i}
		<a {href}>{name}</a>
		{#if i < links.length - 1}
			<span> | </span>
		{/if}
	{/each}
</p>

{#each stuff as { name, description, href }}
	<div class="item">
		<a {href}>
			<h2>{name}</h2>
		</a>
		<p><i>{description}</i></p>
	</div>
{/each}

<style lang="scss">
	button.text-like {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
	}

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
	}
</style>