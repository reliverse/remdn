# remdn built-in generator fixtures

## `badges`

<!-- remdn:badges bundlephobia packagephobia  -->

[![npm version](https://img.shields.io/npm/v/remdn)](https://npmjs.com/package/remdn)
[![npm downloads](https://img.shields.io/npm/dm/remdn)](https://npm.chart.dev/remdn)
[![bundle size](https://img.shields.io/bundlephobia/minzip/remdn)](https://bundlephobia.com/package/remdn)
[![install size](https://badgen.net/packagephobia/install/remdn)](https://packagephobia.com/result?p=remdn)

<!-- /remdn -->

## `pm-x`

<!-- remdn:pm-x args=. -->

```sh
# npm
npx remdn .

# pnpm
pnpm dlx remdn .

# bun
bunx remdn .

# deno
deno run -A npm:remdn .
```

<!-- /remdn -->

## `pm-install`

<!-- remdn:pm-install dev separate-->

```sh
# ✨ Auto-detect
npx nypm install -D remdn
```

```sh
# npm
npm install -D remdn
```

```sh
# yarn
yarn add -D remdn
```

```sh
# pnpm
pnpm install -D remdn
```

```sh
# bun
bun install -D remdn
```

```sh
# deno
deno install --dev remdn
```

<!-- /remdn -->

## `jsdocs`

<!-- remdn:jsdocs src=./src/test -->

### `config`

#### `checked`

- **Type**: `boolean`
- **Default**: `false`

checked state

#### `dimensions`

Configure the dimensions

**Example:**

```js
{ width: 10, height: 10 }
```

##### `height`

- **Type**: `number`
- **Default**: `10`

Height in px

##### `width`

- **Type**: `number`
- **Default**: `10`

Width in px

#### `name`

- **Type**: `string`
- **Default**: `"default"`

The name of the configuration

#### `price`

- **Type**: `number`
- **Default**: `12.5`

The price

#### `tags`

- **Type**: `array`
- **Default**: `["tag1",null]`

A list of tags

### `sendMessage(message, date, flash?)`

Send a message

This is another description of the function that spans multiple lines.

Again, this is another description of the function that spans multiple lines.

**Example:**

```js
sendMessage("Hello", "7/1/1995", false); // => "OK"
```

<!-- /remdn -->

## `jsimport`

<!-- remdn:jsimport cjs=true cdn=true name=pkg imports=foo,bar -->

**ESM** (Node.js, Bun, Deno)

```js
import { foo, bar } from "pkg";
```

**CommonJS** (Legacy Node.js)

```js
const { foo, bar } = require("pkg");
```

**CDN** (Deno, Bun and Browsers)

```js
import { foo, bar } from "https://esm.sh/pkg";
```

<!-- /remdn -->

## `with-remdn`

<!-- remdn:with-remdn -->

---

_🤖 auto updated with [remdn](https://remdn.unjs.io)_

<!-- /remdn -->

## `fetch`

<!-- remdn:fetch url="gh:unjs/remdn/main/test/fixture/TEST.md" -->

## The Lazy Coder's Guide to Programming

Programming can be hard. But fear not! With the power of copy-paste, you can conquer any coding challenge without breaking a sweat. Just remember: if it works once, it'll work a thousand times. Who needs original code anyway?

When your code doesn't work, don't blame yourself. It's clearly the compiler's fault for not understanding your genius. Remember, the more error messages you get, the closer you are to becoming a programming master.

Why waste time solving problems when someone else has already done it for you? Stack Overflow is your best friend, your mentor, and your savior. Just make sure to upvote the answers that save your bacon.

<!-- /remdn -->

## `file`

<!-- remdn:file src="./TEST.md" lines=1:5 -->

## The Lazy Coder's Guide to Programming

Programming can be hard. But fear not! With the power of copy-paste, you can conquer any coding challenge without breaking a sweat. Just remember: if it works once, it'll work a thousand times. Who needs original code anyway?

When your code doesn't work, don't blame yourself. It's clearly the compiler's fault for not understanding your genius. Remember, the more error messages you get, the closer you are to becoming a programming master.

<!-- /remdn -->

## `contributors`

<!-- remdn:contributors author=pi0 license=MIT -->

Published under the [MIT](https://github.com/unjs/remdn/blob/main/LICENSE) license.
Made by [@pi0](https://github.com/pi0) and [community](https://github.com/unjs/remdn/graphs/contributors) 💛
<br><br>
<a href="https://github.com/unjs/remdn/graphs/contributors">
<img src="https://contrib.rocks/image?repo=unjs/remdn" />
</a>

<!-- /remdn -->

<!-- remdn:contributors author=pi0 license=MIT provider=markupgo  -->

Published under the [MIT](https://github.com/unjs/remdn/blob/main/LICENSE) license.
Made by [@pi0](https://github.com/pi0) and [community](https://github.com/unjs/remdn/graphs/contributors) 💛
<br><br>
<a href="https://github.com/unjs/remdn/graphs/contributors">
<img src="https://markupgo.com/github/unjs/remdn/contributors?circleSize=64&center=true&removeLogo=true" />
</a>

<!-- /remdn -->
