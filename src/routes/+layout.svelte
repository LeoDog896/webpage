<script lang="ts">
    import '@fontsource-variable/inter';
    import '../app.scss'
	import Footer from '$lib/Footer.svelte';
</script>

<main>
    <slot />
</main>

<Footer />

<style>
    main {
        max-width: 80ch;
        padding: 2ch;
        margin: 0 auto;
    }
</style>
