import { feed } from '$lib/feed';
import { articles } from '$lib/posts';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	await Promise.all(articles);
	return new Response(feed.rss2(), {
		headers: {
			'content-type': 'application/rss+xml'
		}
	});
}

export const prerender = true;
