<script lang="ts">
	interface Feed {
		name: string;
		path: string;
	}

	const feeds: Feed[] = [
		{
			name: "RSS",
			path: "/feed/rss"
		},
		{
			name: "Atom",
			path: "/feed/atom"
		},
		{
			name: "JSON",
			path: "/feed/json"
		}
	]
</script>

<svelte:head>
	<title>Subscribable Feeds</title>
</svelte:head>

<h1>Subscribable Feeds</h1>

<p>
	I have a <i>huge</i> feed I use for blogs, and I finally got to making one for my own blog!
	This blog supports all major feed formats. Feel free to copy the below links!
</p>

<ul>
	{#each feeds as feed}
		<li><a href={feed.path}>{feed.name}</a></li>
	{/each}
</ul>