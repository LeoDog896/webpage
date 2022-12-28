<script lang="ts">
	enum BlogType {
		MEDIUM = 'Medium',
		DEVTO = 'dev.to',
		HERE = 'here'
	}

	interface Blog {
		name: string;
		description?: string;
		type: BlogType;
		link: string;
	}

	const blogs: Blog[] = [
		{
			name: 'How to recursively read a directory in Deno.',
			type: BlogType.MEDIUM,
			link: 'https://medium.com/@LeoDog896/how-to-recursively-read-a-directory-in-deno-bc9f1f70f0eb'
		}
	];
</script>

<div class="m-8 mt-24 mr-16">
	<h1 class="text-xl font-bold">BLOG</h1>
	{#if blogs.length === 0}
		<p>sorry, nothing here yet 😛. this will have a feed of articles (maybe?)</p>
	{:else}
		{#each blogs as blog}
			<div>
				<a class="text-blue-600 underline" href={blog.link}>{blog.name} ({blog.type})</a>
			</div>
		{/each}
		<p>that's the end! sorry, I dont write much.</p>
	{/if}
</div>
