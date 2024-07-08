import { articles } from '$lib/articles';
import { posts } from '$lib/posts';

/** @type {import('./$types').PageLoad} */
export async function load() {
	return {
		articles: await Promise.all(articles),
		posts: await Promise.all(posts)
	};
}
