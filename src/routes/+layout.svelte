<script lang="ts">
	import '../app.css';

  interface NavLink {
    name: string;
    href: string;
  }

  const root = "/webpage"

  const nav: NavLink[] = [{
    name: "home",
    href: root
  }, {
    name: "blog",
    href: root + "/blog"
  }]
</script>

<div class="text-primary fixed top-0 left-0 w-screen bg-white shadow-lg p-4 border-b-2 border-black z-10">
  {#each nav as { name, href } }
    <a {href} class="m-2 px-4 py-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg">{name}</a>
  {/each}
</div>

<slot />
