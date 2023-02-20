import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { join } from "path";

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	layout: "./src/lib/BlogLayout.svelte",

	remarkPlugins: [],
	rehypePlugins: []
});

export default config;
