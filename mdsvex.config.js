import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import codeTitle from 'remark-code-title';
import rehypePrettyCode from 'rehype-pretty-code';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	layout: './src/lib/BlogLayout.svelte',

	highlight: false,

	remarkPlugins: [codeTitle],
	rehypePlugins: [
		[
			rehypePrettyCode,
			{
				theme: 'github-light'
			}
		]
	]
});

export default config;
