# @reliverse/redocs

> automate. generate. own your markdown.

[📦 npm](https://npmjs.com/package/@reliverse/redocs) • [✨ github](https://github.com/reliverse/redocs) • [💬 discord](https://discord.gg/pb8ukbwpsj)

## what is redocs?

@reliverse/redocs is the markdown automation tool that doesn’t care about your old docs.  
generate, update, and validate your markdown—automatically, brutally, and fast.  
built on typescript, made for code-first devs.  
your readme, docs, and exports stay in sync with your project, not your memory.

## features

- ultra-fast cli—updates your markdown before you blink
- programmatic api—build custom automation, no limits
- custom generators—write your own, or use built-ins
- plugin system—coming soon, extend it or break it
- built for monorepos and modern toolchains—no legacy baggage
- typescript schemas—enforce structure, catch mistakes early
- annotation-based generators—embed dynamic content with special blocks
- works with any `.md`, `.mdx`, `.mdc`—not just `readme.md`

> **warning:**  
> some features are not here yet. they’re coming in v1.0.0.  
> want something? complain on [discord](https://discord.gg/pb8ukbwpsj) or [github issues](https://github.com/reliverse/redocs/issues).  
> your feedback shapes this project. don’t hold back.

## getting started

### install

```sh
bun add -D @reliverse/redocs
```

or run without install:

```sh
npx redocs
```

by default, redocs looks for `.reliverse/redocs/readme.ts` and generates/updates your `readme.md` with annotation blocks like `<!-- redocs:* -->`.

## entry files & usage

write your markdown in code.  
create `.reliverse/redocs/readme.ts`:

```ts
import { defineMarkdown } from "@reliverse/redocs"

export default defineMarkdown({
  intro: () => `
    # my cool project

    > built with love by robots.
  `,
  install: () => `
    ## install

    \`\`\`bash
    pnpm add my-cool-pkg
    \`\`\`
  `,
})
```

**output:**  

- generated files go to the repo root (e.g. `readme.md`) unless you say otherwise
- directory structure is preserved from `.reliverse/redocs/`

## config & schema

lock down your docs structure with a config file:  
`.reliverse/redocs.config.ts`:

```ts
export default defineRedocsConfig({
  files: {
    readme: {
      entry: ".reliverse/redocs/readme.ts",
      output: "README.md",
      structure: ["intro", "install", "usage", "license"],
    },
  },
})
```

missing a section? redocs warns you.  
no more half-baked docs.

## built-in generators

annotation-based generators—drop them in your markdown, let redocs do the rest.
If any section (e.g. `usage`) is missing from your entry file while declared in the configuration, Redocs logs a warning ensuring your documentation stays consistent.

> **Tip:** Structure validation helps to enforce discipline across your documentation.

below are some examples and usage details:

### badges

insert badges for npm downloads, license info, bundle size, etc.

```md
<!-- redocs:badges name="redocs" license bundlephobia -->
<!-- /redocs -->
```

### contributors

display a visual contributor graph and author/license details.

```md
<!-- redocs:contributors author="blefnk" license="MIT" -->
<!-- /redocs -->
```

### fetch

inline remote content from github or any url.

```md
<!-- redocs:fetch url="gh:reliverse/redocs/main/docs/example.md" -->
<!-- /redocs -->
```

### file

embed source files as formatted code blocks.

```md
<!-- redocs:file src="./src/example.ts" code lang="ts" -->
<!-- /redocs -->
```

### jsdocs

automatically generate documentation from your typescript/jsdoc comments.

```md
<!-- redocs:jsdocs src="./src/api" headingLevel=2 -->
<!-- /redocs -->
```

### jsimport

show examples for using your package in various module systems (esm, cjs, cdn).

```md
<!-- redocs:jsimport name="redocs" imports="runRedocs, defineGenerator" cjs cdn -->
<!-- /redocs -->
```

### pm-install

generate installation commands compatible with multiple package managers.

```md
<!-- redocs:pm-install name="redocs" dev -->
<!-- /redocs -->
```

### pm-x

provide package runner commands via `npx`, `bunx`, etc.

```md
<!-- redocs:pm-x name="redocs" version="latest" args="README.md" -->
<!-- /redocs -->
```

### with-redocs

automatically add an update banner or footer indicating the docs are generated with redocs.

```md
<!-- redocs:with-redocs -->
<!-- /redocs -->
```

## cli commands

run redocs from the cli—generate, update, automate:

```sh
npx @reliverse/redocs [...options]
npx redocs                 # generate all markdown from .reliverse/redocs/
npx redocs file readme     # regenerate a specific entry
```

| flag        | default        | what it does                        |
|-------------|---------------|-------------------------------------|
| `--file`    | `README.md`   | which markdown file to update       |
| `--dir`     | `.`           | root working directory              |
| `--config`  | auto          | path to config (e.g. `.redocsrc`)   |
| `--dry`     | `false`       | preview changes, don’t write        |
| `--debug`   | `false`       | verbose logging                     |

## programmatic api

use redocs in your own scripts:

```ts
import { runRedocs, transformMarkdown } from "@reliverse/redocs"

await runRedocs({ file: "README.md" })

const result = await transformMarkdown(markdownContent)
```

## for developers

- write markdown in typescript: `.reliverse/redocs/readme.ts`
- lock structure with `.reliverse/redocs.config.ts`
- get full type inference and schema validation
- combine with annotation generators for real automation
- **ai generation coming soon**—llm-powered docs, zero effort
- **docs runner coming soon**—for now, try `bun i -g undocs` > `undocs build` > `undocs dev` to run docs locally.  
  our own, better version is on the way.

## docs generation

### `redocs init`: get started fast

```sh
npx redocs init
```

- creates `.reliverse/redocs/` if missing
- scaffolds `readme.ts` with common sections
- generates `.reliverse/redocs.config.ts` with structure
- creates a starter `readme.md` with annotation blocks

### full docs with astro starlight

```sh
npx redocs create docs --[fumadocs|astro-starlight|astro|starlight]
```

- generates `docs/` with astro starlight boilerplate
- converts all `.reliverse/redocs/**/*.ts` to `.mdx` pages
- auto-generates sidebar nav
- supports flags: `--output`, `--title`, `--clean`

## i18n

multi-language docs, no extra work:

- use `.reliverse/redocs/en/readme.ts`, `.reliverse/redocs/uk/readme.ts`, etc.
- run `npx redocs --locale uk` for language-specific output
- `npx redocs all` to generate all languages at once

go global, stay in control.

## `@reliverse/redocs-utils`

it’s the markdown swiss army knife for redocs and anyone who wants to script their docs without a phd in asts.

### why?

markdown is supposed to be simple.  
but every time you want to automate docs, you hit a wall of bloated asts, endless plugins, and "ecosystem" drama.  
redocs-utils gives you the tools to read and write markdown programmatically—**no ast, no bs**.  
just strings in, strings out.  
if you want to build, transform, or automate markdown, this is your toolkit.

### install it

```sh
bun add @reliverse/redocs-utils
# or: pnpm add @reliverse/redocs-utils
```

### use it

```ts
import { md } from "@reliverse/redocs-utils"
// or: const { md } = require("@reliverse/redocs-utils")
```

### render utils

- `md.blockquote(text)`  
  > renders a blockquote: `> text`

- `md.bold(text)`  
  > `**text**`

- `md.boldAndItalic(text)`  
  > `***text***`

- `md.codeBlock(code, lang?)`  
  > code block with optional language

- `md.heading(text, level)`  
  > `# heading` (level 1-6)

- `md.hr()`  
  > horizontal rule: `---`

- `md.image(url, text?)`  
  > `![text](url)`

- `md.italic(text)`  
  > `_text_`

- `md.link(url, text?, opts?)`  
  > `[text](url)` or html if `external: true`

- `md.list(items, { ordered? })`  
  > `- item` or `1. item`

- `md.strikethrough(text)`  
  > `~~text~~`

- `md.table({ columns, rows })`  
  > markdown table, no sweat

### parsing utils

**warning:**  
parsing returns unstable trees.  
use at your own risk.  
if you want a stable ast, go elsewhere.

- `initMarkdownItParser(opts)`  
- `initMd4wParser(opts)`  
- `initMdAstParser(opts)`

example:

```ts
import { initMarkdownItParser } from "@reliverse/redocs-utils/parser"
const parser = await initMarkdownItParser()
const { tree } = parser.parse("# hello, *world*!")
```

## what’s next

- plugin api—extend redocs, break the rules
- snapshot testing—docs that never drift
- remote fetch caching—faster, smarter
- custom blocks & themes—style it your way
- interactive playground ui—visual editor for your markdown

## shoutouts

redocs stands on the shoulders of [automd](https://github.com/unjs/automd).  

## support

if redocs saved you time, pay it forward:

- ⭐ star the repo: [github](https://github.com/reliverse/redocs)
- 💖 sponsor @blefnk: [sponsor page](https://github.com/sponsors/blefnk)
- 🧙 tell your dev friends

## license

mit © [blefnk nazar kornienko](https://github.com/blefnk)

## tl;dr

**redocs: docs that write themselves.**
