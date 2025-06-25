import "server-only";

import msg from "lib-with-conditions";

import { shared } from "./shared.ts";

export function server() {
  return { msg, shared: shared() };
}
