<script lang="ts">

  import Backdrop from "$lib/Backdrop.svelte"
  interface Project {
    name: string;
    description: string;
    link: string;
    github: string;
    color?: string;
  }

  const projects: Project[] = [
    {
      name: "duckshow",
      description: "A calming duck (and other animals) background slideshow",
      link: "https://leodog896.github.io/duckshow",
      github: "https://github.com/LeoDog896/duckshow",
      color: "#915f29"
    },
    {
      name: "scannable",
      description: "A QR code generation library",
      link: "https://leodog896.github.io/scannable",
      github: "https://github.com/LeoDog896/scannable"
    },
    {
      name: "conspirasea",
      description: "A conspiracy maker",
      link: "https://leodog896.github.io/conspirasea",
      github: "https://github.com/LeoDog896/conspirasea"
    }
  ]
</script>

<Backdrop/>
<div class="font-primary w-screen h-screen  flex justify-center items-center overflow-x-visible">
  <div class="drop-shadow-lg">
    <h1 class="text-3xl sm:text-4xl md:text-6xl">
      <span class="hover:animate-wiggle inline-block">👋</span> Hello, I'm Tristan!
    </h1>
    <p class="mt-4 text-gray-700">I make websites, software, and occasionally games.</p>
  </div>
  <a href="#projects" class="absolute top-[80vh] left-[50vw] translate-x-[-50%] animate-bounce">
    <span class="shadow-lg py-2 px-8 bg-black hover:bg-gray-800 transition-all active:bg-gray-700 text-white translate-x-[-50%] rounded-full block rotate-180 text-xl">^</span>
  </a>
</div>
<div class="font-primary w-screen overflow-x-hidden">
  <h1 id="projects" class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl m-16 mb-2 text-center">My Projects</h1>
  <h3 class="text-center text-xl text-gray-600 mb-12">(that I like)</h3>
  <div class="flex flex-row flex-wrap place-content-around w-full">
    {#each projects as project}
      <div
        class="rounded-sm shadow-md w-full basis-1/2 bg-gray-200 m-4 p-4 flex-none text-black bg-right hover:bg-left transition-[background-position_1s] bg-[length:200%_200%]"
        style="background-image: linear-gradient(to right, #bbb 50%, #ddd 0);"
      >
        <h1>{project.name} (<a class="text-sky-700 underline" href={project.github}>github</a> | <a class="text-sky-700 underline" href={project.link}>link</a>)</h1>
        <p class="text-black">{@html project.description}</p>
      </div>
    {/each}
  </div>
</div>
<footer class="mt-10 p-4 text-center w-screen bg-teal-100">
  Made with ❤️ by Tristan | <a class="underline" href="https://github.com/LeoDog896">github</a>
</footer>