---
title: to integrated software patching
emoji: 🩹
layout: blog
---

Generally, when I encounter errors in third-party dependencies, I send an upstream PR for a fix and some form of a hacky workaround. This generally works fine and helps me give back a little, but it's quite annoying to fix in the meanwhile - some code hack in the codebase to override native properties, or having to clone and fork the dependency locally.

This post isn't a recomendation of any kind, but rather just an acknoledgement to the incredible tools that make this process easy - [the 3rd party patch-package](https://www.npmjs.com/package/patch-package), `pnpm patch`, [the 3rd party cargo-patch](https://crates.io/crates/cargo-patch) and many other tools that help software developers to solve problems quicker.
