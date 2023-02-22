
<figure>
	<slot></slot>
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
	