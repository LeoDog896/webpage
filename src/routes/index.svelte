<script lang="ts">

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
      name: "reaction",
      description: "A simple reaction timer",
      link: "https://leodog896.github.io/reaction",
      github: "https://github.com/LeoDog896/reaction"
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
    },
    {
      name: "the things we carry",
      description: "an english creative project for the book <i>The Things They Carried</i> by Tim O' Brien.",
      link: "https://leodog896.github.io/the-things-we-carry",
      github: "https://github.com/LeoDog896/the-things-we-carry"
    }
  ]
</script>

<div class="font-primary w-screen h-screen bg-gradient-to-t from-rose-100 to-teal-100 flex justify-center items-center overflow-x-visible">
  <div class="drop-shadow-lg">
    <h1 class="text-6xl">
      <span class="animate-wiggle">👋</span> Hello, I'm Tristan!
    </h1>
    <p class="mt-4 text-gray-700">I make websites, software, and occasionally games.</p>
  </div>
  <a href="#projects" class="absolute top-[80vh] left-[50vw] translate-x-[-50%] motion animate-bounce motion-reduce:animate-ping">
    <span class="shadow-lg py-2 px-8 bg-black hover:bg-gray-800 transition-all active:bg-gray-700 text-white translate-x-[-50%] rounded-full block rotate-180 text-xl">^</span>
  </a>
</div>
<div class="font-primary w-screen overflow-x-hidden">
  <h1 id="projects" class="text-7xl m-8 text-center">My Projects</h1>
  <div class="flex flex-row flex-wrap place-content-around w-full">
    {#each projects as project}
      <div class="w-full basis-1/2 bg-gray-200 m-4 p-4 flex-none text-black">
        <h1>{project.name} (<a class="text-sky-700 underline" href={project.github}>github</a> | <a class="text-sky-700 underline" href={project.link}>link</a>)</h1>
        <p class="text-black">{@html project.description}</p>
      </div>
    {/each}
  </div>
</div>