<script lang="ts">
	import Footer from "$lib/Footer.svelte";

	interface Project {
		name: string;
		description: string;
		link: string;
		github: string;
		color?: string;
	}

	const projects: Project[] = [
		{
			name: 'duckshow',
			description: 'A calming infinite animal slideshow',
			link: 'https://leodog896.github.io/duckshow',
			github: 'https://github.com/LeoDog896/duckshow',
			color: '#915f29'
		},
		{
			name: 'scannable',
			description: 'A QR code generation library',
			link: 'https://leodog896.github.io/scannable',
			github: 'https://github.com/LeoDog896/scannable'
		},
		{
			name: 'conspirasea',
			description: 'A conspiracy maker',
			link: 'https://leodog896.github.io/conspirasea',
			github: 'https://github.com/LeoDog896/conspirasea'
		}
	];
</script>

<div class="mt-40 font-primary w-screen flex justify-center items-center overflow-x-visible">
	<div class="drop-shadow-lg bg-[#90BE6D] p-8 rounded-sm border-black border-4">
		<h1 class="text-3xl sm:text-4xl md:text-6xl">
			<span class="hover:animate-wiggle inline-block">👋</span> Hello, I'm Tristan!
		</h1>
		<p class="mt-4 text-gray-700">I make websites, software, and occasionally games.</p>
	</div>
</div>
<div class="font-primary w-screen overflow-x-hidden">
	<h1 id="projects" class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl m-16 mb-2 text-center">
		My Stuff
	</h1>
	<h3 class="text-center text-xl text-gray-600">(that I like)</h3>
	<h4 class="text-center text-lg text-gray-400">(my <a href="https://github.com/LeoDog896" class="text-blue-400 hover:underline">github profile</a> has a lot more, though!)</h4>
	<div class="flex flex-row flex-wrap place-content-around w-full">
		{#each projects as project}
			<a
				class="rounded-sm shadow-md w-full basis-1/2 bg-gray-200 m-4 p-4 flex-none text-black bg-right hover:bg-left transition-[background-position_1s] bg-[length:200%_200%]"
				style="background-image: linear-gradient(to right, #bbb 50%, #ddd 0);"
				href={project.link}
			>
				<h1>{project.name} (<a class="text-sky-700 underline" href={project.github}>view on github</a>)</h1>
				<p class="text-black">{@html project.description}</p>
			</a>
		{/each}
	</div>
</div>
<Footer></Footer>
