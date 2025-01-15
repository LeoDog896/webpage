import { mdsvex, escapeSvelte } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineMDSveXConfig } from 'mdsvex';
import { createHighlighter } from 'shiki';
import { transformerNotationFocus, transformerNotationHighlight } from '@shikijs/transformers';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex(
			defineMDSveXConfig({
				layout: {
					article: './src/lib/ArticleLayout.svelte'
				},
				highlight: {
					// im not dealing with rehype again.
					// this is from https://joyofcode.xyz/sveltekit-markdown-blog#syntax-highlighting
					highlighter: async (code, lang = 'text') => {
						const highlighter = await createHighlighter({
							themes: ['vitesse-dark'],
							langs: ['javascript', 'typescript', 'yaml', 'gdscript', 'lean4']
						});
						
						await highlighter.loadLanguage('javascript', 'typescript', 'yaml', 'gdscript', 'lean4');
						const html = `<div class="webbed-codeblock">${escapeSvelte(
							highlighter.codeToHtml(code, {
								lang,
								theme: 'vitesse-dark',
								transformers: [
									transformerNotationHighlight(),
									transformerNotationFocus()
								]
							})
						)}</div>`;
						highlighter.dispose();
						return `{@html \`${html}\` }`;
					}
				}
			})
		)
	],

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	},

	extensions: ['.svelte', '.svx', '.md']
};

export default config;
