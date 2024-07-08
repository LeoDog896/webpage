import { articles } from './articles';
import { Feed } from 'feed';

export const feed = new Feed({
	title: "Leo's Blog",
	description: "Leo's personal blog feed.",
	id: 'https://leodog896.com/',
	link: 'https://leodog896.com/',
	language: 'en',
	image: 'https://leodog896.com/favicon.png',
	copyright: 'All rights reserved 2023, Tristan F.',
	feedLinks: {
		atom: 'https://leodog896.com/feed/atom',
		rss: 'https://leodog896.com/feed/rss'
	},
	author: {
		name: 'Tristan F.',
		email: 'leodog896@gmail.com',
		link: 'https://leodog896.com/'
	}
});

Promise.all(articles).then((articles) => {
	for (const article of articles) {
		feed.addItem({
			title: article.name,
			id: article.slug,
			link: `https://leodog896.com/${article.href}`,
			description: article.description,
			content: 'Not available.',
			author: [
				{
					name: 'Tristan F.',
					email: 'leodog896@gmail.com',
					link: 'https://leodog896.com/'
				}
			],
			date: new Date(article.date)
		});
	}
});
