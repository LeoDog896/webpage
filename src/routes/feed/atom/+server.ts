import { feed } from '$lib/feed';
import { articles } from '$lib/articles';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	await Promise.all(articles);
	return new Response(feed.atom1(), {
		headers: {
			'content-type': 'application/atom+xml'
		}
	});
}

export const prerender = true;
