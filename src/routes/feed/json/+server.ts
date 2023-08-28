import { feed } from "$lib/feed";
import { articles } from "$lib/posts";

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	await Promise.all(articles);
	return new Response(feed.json1(), {
		headers: {
			"content-type": "application/json"
		}
	});
}

export const prerender = true
