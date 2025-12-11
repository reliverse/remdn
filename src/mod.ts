import { defineCommand, runMain } from "@reliverse/rempts";

const main = defineCommand({
  meta: {
    name: "reinject",
    version: "1.0.0",
    description: "@reliverse/reinject-cli",
  },
    : {
    cli: () => import("./app/args/cli-mod.js").then((r) => r.default),
    tee: () =>
      import("./app/args/arg-ts-expect-error.js").then((r) => r.default),
  },
});

await runMain(main);
