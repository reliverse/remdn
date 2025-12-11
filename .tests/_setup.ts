import { remdn } from "../src";

console.log("Starting remdn with watcher on repo...");
const { unwatch } = await remdn({
  watch: true,
});

export const setup = async () => {};

export const teardown = async () => {
  await unwatch?.();
};
