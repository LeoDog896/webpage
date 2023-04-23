type LinkType = 'project' | 'security' | 'article';

interface DescriptiveLink {
	name: string;
	href: string;
	description: string;
	type: LinkType;
}

async function fromArticle(slug: string, type: LinkType) {
	const article = await import(`./article/${slug}/+page.md`);

	return {
		name: article.metadata.title,
		href: `article/${slug}`,
		description: article.metadata.description,
		type
	}
}

const stuff: (Promise<DescriptiveLink> | DescriptiveLink)[] = [
	fromArticle('github-catalog', 'project'),
	fromArticle('deno-ansi-injection', 'security'),
	fromArticle('godot-jigsaw', 'article'),
	{
		name: 'CVE-2023-22499',
		description: 'my first reported security vulnerability!',
		href: 'https://github.com/denoland/deno/security/advisories/GHSA-mc52-jpm2-cqh6',
		type: 'security'
	},
	{
		name: 'deno-outdated',
		description: 'a tool to check for outdated dependencies in your deno project',
		href: 'https://github.com/LeoDog896/deno-outdated',
		type: 'project'
	}
];

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    return {
        stuff: await Promise.all(stuff)
    };
}