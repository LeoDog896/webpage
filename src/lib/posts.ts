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

export const posts: (Promise<PostMetadata> | PostMetadata)[] = [
	fromPost('1720402417')
];
