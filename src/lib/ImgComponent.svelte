<script lang="ts">
	export let src: string;
	export let alt: string;
</script>

<figure>
	<img src={src} alt={alt} />
</figure>

<style>
	figure > * {
		display: block;
		margin: 0 auto;
	}

	figure > :global(img) {
		max-width: 100%;
	}
</style>
	