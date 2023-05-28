import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import codeTitle from 'rehype-code-titles';
import rehypePrettyCode from 'rehype-pretty-code';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	layout: './src/lib/BlogLayout.svelte',

	highlight: false,

	remarkPlugins: [],
	rehypePlugins: [
		codeTitle,
		[
			rehypePrettyCode,
			{
				theme: {
					light: 'github-light',
					dark: 'github-dark'
				}
			}
		],
	]
});

export default config;
