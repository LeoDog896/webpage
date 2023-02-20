<script lang="ts">
	export let emojis: string[]

	const randomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

	let currentEmoji = randomEmoji();

	const cycleEmoji = () => {
		const emojiIndex = emojis.indexOf(currentEmoji);
		currentEmoji = emojis[(emojiIndex + 1) % emojis.length];
	};
</script>

<button on:click={cycleEmoji} on:keypress={cycleEmoji}>{currentEmoji}</button>

<style>
	button {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
	}
</style>