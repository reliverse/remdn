import { fileURLToPath } from "node:url";
import { format } from "prettier";
import { expect, describe, it } from "vitest";

import { remdn } from "../src";

describe("remdn generators", () => {
  let output: string;

  it("run on fixture", async () => {
    const { results } = await remdn({
      dir: fileURLToPath(new URL("fixture", import.meta.url)),
      input: "INPUT.md",
      output: "OUTPUT.md",
    });
    output = results[0].contents;
    await expect(output).toMatchFileSnapshot("fixture/OUTPUT.md");

    const issues = results
      .flatMap((r) => r.updates.flatMap((u) => u.result.issues))
      .filter(Boolean);
    expect(issues).toEqual([]);
  });

  it("is formatted", async () => {
    expect(await format(output, { parser: "markdown" })).toEqual(output);
  });
});
