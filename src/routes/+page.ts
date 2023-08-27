import { articles } from '$lib/posts';

/** @type {import('./$types').PageLoad} */
export async function load() {
	return {
		stuff: await Promise.all(articles)
	};
}
