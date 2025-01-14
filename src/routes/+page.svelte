<script lang="ts">
	import Treasure, { uuids, hasPrivilege, currentPrivileges, optedOut } from '$lib/Treasure.svelte';
</script>

<h1>hi! i'm <Treasure id="4dbd2da1-0880-4663-bfc7-d3d977b029b2">tristan</Treasure>!</h1>

<p>
	Here's where I keep my writings. I love ferrets*, despise LLMs*, and complain quite often about
	JavaScript*. All of my original code here is dual licensed under the MIT and Apache 2.0 licenses, <a
		href="https://gist.github.com/kemitchell/fdc179d60dc88f0c9b76e5d38fe47076"
		>unless used for evil</a
	>
	or published in one of my repositories that specifies a license.
</p>

<h2>bounties</h2>

<p>
	<i>note:</i> these don't actually have rewards. at all. if you have an idea for any of these, let me
	know somehow!
</p>

<details>
	<summary>give playful webpage suggestions!</summary>
	<div>
		<p>
			I'm decent at making professional websites. I'm consistent with it, I'm used to it, but I
			really, truly, do not want this website to be professional, as I do not even enjoy the
			professional website style.
		</p>

		<p>
			However, that also means that this website ends up being a weird bleed of attempting to be
			playful and weirdly professional anyway. I can't even find a good font. I will take
			suggestions.
			<Treasure id="6fb61eb9-91bd-4bfa-a1e2-1082108de25b">Please</Treasure>.
		</p>
	</div>
</details>

{#if $uuids.length !== 0 || $optedOut}
	<details>
		<summary>better place to put the orange progress bar</summary>

		<div>
			<p>the place it is right now is a huge violation of jakob's law.</p>
		</div>
	</details>

	<details>
		<summary>gimmick accessibility</summary>

		<div>
			<p>
				I'm not sure how to approach accessibility for the Gimmick. I have an opt-out button, but
				that lies after (for a screen reader at least) a mysterious Button on my name.
			</p>
		</div>
	</details>
{/if}

{#if hasPrivilege($currentPrivileges, 'info')}
	<h2>outlinks</h2>

	<!-- go forth and find my email -->

	<ul>
		<li><a href="https://github.com/LeoDog896">GitHub</a></li>
	</ul>
{/if}

<h2>featured post</h2>

<div class="posts">
	<div class="post">
		<p>2025-01-14</p>
		<a href="/article/a-month-of-lean">The refine tactic: a month of Lean4</a>
	</div>
</div>

{#if $uuids.length === 0 && !$optedOut}
	<p>
		<i>that's odd. you haven't clicked a single Orange Thing yet!</i>
		don't want to have the gimmick?
		<button
			onclick={() => {
				$optedOut = true;
			}}>opt out</button
		>
	</p>
{/if}

{#if hasPrivilege($currentPrivileges, 'technicalPosts')}
	<h2>
		all{#if !hasPrivilege($currentPrivileges, 'allPosts')}<span
				class="info"
				title="except for personal ones. youll need at least 5 Orange Things for that">*</span
			>{/if} posts
	</h2>

	<div class="posts">
		<div class="post">
			<p>2025-01-14</p>
			<a href="/article/a-month-of-lean">The refine tactic: a month of Lean4</a>
		</div>
		<div class="post">
			<p>2023-04-22</p>
			<a href="/article/github-catalog">Automatic GitHub Catalog Generation</a>
		</div>
		<div class="post">
			<p>2023-03-25</p>
			<a href="/article/deno-ansi-injection">2 ANSI injection vulnerabilities in Deno</a>
		</div>
		<div class="post">
			<p>2023-02-18</p>
			<a href="/article/godot-jigsaw">Making a Jigsaw Puzzle in Godot</a>
		</div>
	</div>
{/if}

<style lang="scss">
	.post {
		p {
			margin-bottom: 0.5ch;
			font-size: 1.5rem;
			color: #7d8491;
		}

		a {
			display: block;
			margin-bottom: 1ch;
			font-size: 2rem;
			color: #7d2dc7;
			text-decoration: none;
		}
	}

	span.info {
		cursor: help;
		text-decoration: underline;
		text-decoration-style: dotted;
	}

	details div {
		border-left: 1px solid #7d8491;
		padding-left: 1ch;
	}
</style>
