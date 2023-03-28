import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import codeTitle from "remark-code-title";
import rehypeHighlight from 'rehype-highlight'

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	layout: './src/lib/BlogLayout.svelte',

	highlight: false,

	remarkPlugins: [codeTitle],
	rehypePlugins: [rehypeHighlight]
});

export default config;
