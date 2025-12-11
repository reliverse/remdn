import { describe, it, expect } from "vitest";
import { transform } from "../src";

describe("transform", () => {
  it("basic transform works", async () => {
    const input = `<!-- remdn:test foo=bar -->\n\n<!-- /remdn -->`;

    const result = await transform(input, {
      generators: {
        test: {
          name: "test",
          generate({ args }) {
            return { contents: JSON.stringify({ args }) };
          },
        },
      },
    });

    expect(result.hasChanged).toBe(true);
    expect(result.contents).toMatchInlineSnapshot(`
      "<!-- remdn:test foo=bar -->

      {"args":{"foo":"bar"}}

      <!-- /remdn -->"
    `);

    expect(result.updates).toHaveLength(1);
    expect(result.updates[0].block).toMatchInlineSnapshot(`
      {
        "_loc": {
          "end": 46,
          "start": 0,
        },
        "contents": "

      ",
        "generator": "test",
        "loc": {
          "end": 30,
          "start": 28,
        },
        "rawArgs": "foo=bar",
      }
    `);
  });

  describe("unwrap", () => {
    it("manual unwrap", async () => {
      const input = `foo\n<!-- remdn:test -->\n<!-- /remdn -->\nbaz`;

      const result = await transform(input, {
        generators: {
          test: {
            name: "test",
            generate() {
              return {
                contents: `bar`,
                unwrap: true,
              };
            },
          },
        },
      });

      expect(result.contents).toMatchInlineSnapshot(`
        "foo
        bar
        baz"
      `);
    });
    it("auto unwrap", async () => {
      const input = `a\n<!-- remdn:test -->\n<!-- /remdn -->\nd`;

      const result = await transform(input, {
        generators: {
          test: {
            name: "test",
            generate() {
              return {
                contents: `b\n<!-- remdn:with-remdn lastUpdate=now -->\n<!-- /remdn -->\nc`,
              };
            },
          },
        },
      });

      expect(result.contents).toMatchInlineSnapshot(`
        "a
        b
        <!-- remdn:with-remdn lastUpdate=now -->

        ---

        _🤖 auto updated with [remdn](https://remdn.unjs.io) (last updated: now)_

        <!-- /remdn -->
        c
        d"
      `);
    });
  });
});
