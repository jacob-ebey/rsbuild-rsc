import "client-only";

import msg from "lib-with-conditions";

import { prerender } from "./prerender.ts";
import { server } from "./server.ts" with { graph: "react-server" };
import { shared } from "./shared.ts";
import { shared as sharedServer } from "./shared.ts" with { graph: "react-server" };

function node() {
  return {
    msg,
    shared: shared(),
    prerender: prerender(),
    sharedServer: sharedServer(),
    server: server(),
  };
}

console.log(JSON.stringify(node(), null, 2));
