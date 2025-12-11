import type { Generator } from "../generator.js";
import { jsdocs } from "./jsdocs.js";
import { badges } from "./badges.js";
import { pmX, pmInstall } from "./pm.js";
import { fetch as _fetch } from "./fetch.js";
import { jsimport } from "./jsimport.js";
import { withAutomd } from "./with-automd.js";
import { file } from "./file.js";
import { contributors } from "./contributors.js";

export default {
  jsdocs,
  badges,
  "pm-i": pmInstall,
  "pm-install": pmInstall,
  "pm-x": pmX,
  fetch: _fetch,
  file,
  jsimport,
  "with-automd": withAutomd,
  contributors,
} as Record<string, Generator>;
