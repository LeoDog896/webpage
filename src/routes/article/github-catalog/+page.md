---
title: Automatic GitHub Catalog Generation
description: taking advantage of github pages & jekyll for repo cataloging
emojis: 📖
date: 2023-04-22
slug: github-catalog
type: project
---

Some people in GitHub have [automatic committing](https://github.com/iceBear67/iceBear67/commit/916970d6fa4d8d70c227b8303e5036ded150436a) to show various neat metrics on their README. I quite liked these, but didn't have too much of a usefor them.

However, I have [**>400**](https://github.com/LeoDog896?tab=repositories) repositories, and searching through them is quite a pain. I wanted a way to catalog them, and I wanted to do it in a way that was easy to maintain.

## GitHub Jekyll Pages

The first thing I needed was a nice web service to host my catalogue. Before I bothered to make my own, I remembered a handy little feature GitHub added in the beginning of its pages service: [Jekyll](https://jekyllrb.com/). By combining Jekyll with GitHub pages, you can have a nice looking static site that doesn't require any manual style maitnence.

## Deno

Deno has been a long-time favorite of mine since I started using it for server projects earlier this year. One of its best abilities compared to Node or Python is its ability to combine the vast ecosystem of NPM without the hassle of configuring tools, package managers, and other time-consuming tasks. I *could* use a template to scaffold a project, but Deno has much less clutter and I find it personally easier to use.

I set up a basic Deno script to begin scraping my repositories with the [GitHub GraphQL API](https://docs.github.com/en/graphql), using [zod](https://github.com/colinhacks/zod) for validation.

```ts
import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";

const repoSchema = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  html_url: z.string(),
  stargazers_count: z.number(),
  homepage: z.string().optional().nullable(),
  fork: z.boolean(),
});

type Repo = z.infer<typeof repoSchema>;

console.log("Fetching repos...");
async function* getRepos(): AsyncGenerator<Repo, void, void> {
  let url: string | undefined =
    "https://api.github.com/user/26509014/repos?per_page=100";

  while (url) {
    console.log("Querying", url);

    const res = await fetch(
      url,
      {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${res.status} ${res.statusText}`,
      );
    }

    const data = await res.json();

    const next = res.headers.get("Link")?.match(/<([^>]+)>; rel="next"/);
    url = next?.[1];

    for (const repo of data) {
      yield repoSchema.parse(repo);
    }
  }
}
```

I did have some trouble with pagination, but async generators made it easy to handle.

## Generating the Catalog

Now that I had a way to fetch my repositories, I needed a way to generate the catalog. Combined with Jekyll, this was quite easy. I just needed to generate a markdown file with the repositories in it.

```ts

for await (const page of getRepos()) {
  data.push(page);
}

const projects = data.filter((repo) => !repo.fork || repo.stargazers_count > 1);
const forks = data.filter((repo) => repo.fork && repo.stargazers_count <= 1);

function sortRepos(
  a: typeof data[number],
  b: typeof data[number],
) {
  const aStars = a.stargazers_count;
  const bStars = b.stargazers_count;
  return bStars - aStars;
}

// sort data by stargazers_count
projects.sort(sortRepos);
forks.sort(sortRepos);

let markdown =
  `# [leodog896.github.io](https://github.com/LeoDog896/leodog896.github.io)

these are auto-generated lists of repositories on my account, mainly for catalogue info.

looking for my website? go to [https://leodog896.com](https://leodog896.com) instead.

## Projects (${projects.length})

> **Note**
> Forks with more than 1 star are included in this list
> This is because a few forks are permenant forks of other projects.
`;

for (const repo of projects) {
  const { name, description, html_url, stargazers_count, homepage } = repo;

  markdown += `- [${name} (${stargazers_count})](${html_url}) ${
    homepage ? `([homepage](${homepage}))` : ``
  } - ${description || "No description provided."}\n`;
}

markdown += `
## Forks (${forks.length})

> **Note**
> I have forked a lot of projects for OSS contributions.

`;

for (const repo of forks) {
  const { name, description, html_url, homepage } = repo;

  markdown += `- [${name}](${html_url}) ${
    homepage ? `([homepage](${homepage}))` : ``
  } - ${description || "No description provided."}\n`;
}

console.log(`Writing ${data.length} repos to README.md...`);
await Deno.writeTextFile("README.md", markdown);

console.log("Done!");
```

I also added a few extra features, like sorting by star count, and filtering out forks with more than 1 star.

## GitHub Actions

The last step for me was to automate the script. I used GitHub Actions to run the script every day, and commit the changes to the repository. This way, I can just go to my GitHub page and see the latest version of my catalog. The configuration was based off of [lowlighter/metrics](https://github.com/lowlighter/metrics), from the GitHub action my aformentioned README's author used.

```yaml
name: Generate Project Catalog
on:
  # Schedule daily updates
  schedule: [{cron: "0 0 * * *"}]
  # (optional) Run workflow manually
  workflow_dispatch:
  # Run workflow when pushing on main
  push:
    branches: ["main"]
jobs:
  github-metrics:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: Setup deno
        uses: denoland/setup-deno@v1
        with:
          deno-version: v1.x
      - name: Run deno grab action
        run: deno task grab
      # auto-commit suggestions
      - uses: stefanzweifel/git-auto-commit-action@v4
```

## Conclusion

I'm really happy with how this turned out. Now, whenever I need to find an older project of mine, I can simply go to my main github page, which doesn't conflict with the rest of my projects.

Link: https://leodog896.github.io/
