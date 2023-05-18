type LinkType = 'project' | 'security' | 'article';

interface DescriptiveLink {
	name: string;
	href: string;
	description: string;
	type: LinkType;
}

async function fromArticle(slug: string) {
	const article = await import(`./article/${slug}/+page.md`);

	return {
		name: article.metadata.title,
		href: `article/${slug}`,
		description: article.metadata.description,
		type: article.metadata.type
	};
}

const stuff: (Promise<DescriptiveLink> | DescriptiveLink)[] = [
	fromArticle('github-catalog'),
	fromArticle('deno-ansi-injection'),
	fromArticle('godot-jigsaw')
];

/** @type {import('./$types').PageLoad} */
export async function load() {
	return {
		stuff: await Promise.all(stuff)
	};
}
