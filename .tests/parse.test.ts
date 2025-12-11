import { describe, it, expect } from "vitest";

import { parseRawArgs, findBlocks } from "~/app/generate/impl/_parse.js";

describe("parseRawArgs", () => {
  const tests = [
    ["foo", { foo: true }],
    ["no-foo", { foo: false }],
    ["foo=bar", { foo: "bar" }],
    [
      "a-key=a-value another-key=another-value",
      { aKey: "a-value", anotherKey: "another-value" },
    ],
  ] as const;
  for (const [input, expected] of tests) {
    it(`${JSON.stringify(input)} => ${JSON.stringify(expected)}`, () => {
      expect(parseRawArgs(input)).toEqual(expected);
    });
  }
});

describe("findBlocks", () => {
  const fixture = `
<!-- remdn:pm-x args=. -->
(a)
<!-- /remdn -->

<!-- remdn:pm-install dev no-auto -->
(b)
<!-- /remdn -->

<!-- remdn:jsdocs -->
(c)
<!-- /remdn -->
  `;

  const mkBlock = (generator: string, rawArgs: string, contents: string) => ({
    generator,
    rawArgs,
    contents: expect.stringContaining(contents),
    loc: { start: expect.any(Number), end: expect.any(Number) },
  });

  it("should find all blocks", () => {
    const blocks = findBlocks(fixture);
    expect(blocks[0]).toMatchObject(mkBlock("pm-x", "args=.", "(a)"));
    expect(blocks[1]).toMatchObject(
      mkBlock("pm-install", "dev no-auto", "(b)"),
    );
    expect(blocks[2]).toMatchObject(mkBlock("jsdocs", "", "(c)"));
  });
});
