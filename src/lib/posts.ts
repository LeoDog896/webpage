interface PostMetadata {
	name: string;
	href: string;
	slug: string;
	emoji: string;
	part?: number | undefined;
}

async function fromPost(slug: string) {
	const article = await import(`../routes/miniblog/${slug}/+page.md`);

	return {
		name: article.metadata.title,
		href: `miniblog/${slug}`,
		slug,
		emoji: article.metadata.emoji,
		part: article.metadata.part ?? undefined
	};
}

function noSlug(key: string): never {
	throw new Error(`Slug not found in ${key}.`);
}

function getSlugs(): string[] {
	return Object.keys(import.meta.glob('../routes/miniblog/*/+page.md'))
		.map(key => key.match(/\.\.\/routes\/miniblog\/(\d+)/)?.[1] ?? noSlug(key))
		.map(key => parseInt(key))
		.sort((a, b) => b - a);
}

export const posts: (Promise<PostMetadata> | PostMetadata)[] = getSlugs().map(fromPost)
