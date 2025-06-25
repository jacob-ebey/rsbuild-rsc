import msg from "lib-with-conditions";

import { shared } from "./shared.ts";

export function prerender() {
  return { msg, shared: shared() };
}
