<script lang="ts">
    import Treasure, { uuids, hasPrivilege, currentPrivileges } from "$lib/Treasure.svelte";
	import { onMount } from "svelte";

    let showHint = $state(false);

    onMount(() => {
        setTimeout(() => {
            showHint = true;
        }, 5000)
    });
</script>

<h1>hi! i'm <Treasure id="4dbd2da1-0880-4663-bfc7-d3d977b029b2">tristan</Treasure>!</h1>

<p>
    Here's where I keep my writings. I love ferrets*, despise LLMs*, and
    complain quite often about JavaScript quirks*.
</p>

<h2>bounties</h2>

<p><i>note:</i> these don't actually have rewards. at all.</p>

<details>
    <summary>give playful webpage suggestions!</summary>
    <p>
        I'm decent at making professional websites. I'm consistent with it, I'm used to it, but I really, truly,
        do not want this website to be professional, as I do not even enjoy the professional website style.
    </p>

    <p>
        However, that also means that this website ends up being a weird bleed of attempting to be playful
        and weirdly professional anyway. I can't even find a good font. I will take suggestions.
        <Treasure id="6fb61eb9-91bd-4bfa-a1e2-1082108de25b">Please</Treasure>.
    </p>
</details>

{#if $uuids.length !== 0}
    <details>
        <summary>better place to put the orange progress bar</summary>

        <p>the place it is right now is a huge violation of jakob's law.</p>
    </details>
{/if}

{#if hasPrivilege($currentPrivileges, "info")}
    <h2>outlinks</h2>

    <!-- go forward and find my email -->

    <ul>
        <li><a href="https://github.com/LeoDog896">github</a></li>
        <li><a href="https://people.reed.edu/~tristanf/">empty academic website</a></li>
    </ul>
{/if}

<h2>featured posts</h2>

<i>none yet.</i>

{#if showHint && $uuids.length === 0}
    <p><i>that's odd. you've been on this page for 5 seconds and you haven't clicked a single orange link yet!</i></p>
{/if}

{#if hasPrivilege($currentPrivileges, "technicalPosts")}
    <h2>
        all posts{#if !hasPrivilege($currentPrivileges, "allPosts")}*{/if}
    </h2>

    <div class="posts">
        <div class="post">
            <p>2025-01-14</p>
            <a href="/article/a-month-of-lean">The refine tactic: a month of lean4</a>
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
            color: #7D8491;
        }

        a {
            display: block;
            margin-bottom: 1ch;
            font-size: 2rem;
            color: #7d2dc7;
            text-decoration: none;
        }
    }
</style>