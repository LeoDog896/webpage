type LinkType = 'project' | 'security' | 'article';

interface DescriptiveLink {
	name: string;
	href: string;
	slug: string;
	description: string;
	type: LinkType;
	date: string;
}

async function fromArticle(slug: string) {
	const article = await import(`../routes/article/${slug}/+page.md`);

	return {
		name: article.metadata.title,
		href: `article/${slug}`,
		slug,
		description: article.metadata.description,
		type: article.metadata.type,
		date: article.metadata.date,
	};
}

export const articles: (Promise<DescriptiveLink> | DescriptiveLink)[] = [
	fromArticle('github-catalog'),
	fromArticle('deno-ansi-injection'),
	fromArticle('godot-jigsaw')
];
