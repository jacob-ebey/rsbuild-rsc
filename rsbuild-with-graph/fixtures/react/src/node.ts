import "client-only";

import msg from "lib-with-conditions";

import { prerender } from "./prerender.ts";
import { server } from "./server.ts" with { graph: "react-server" };
import { shared } from "./shared.ts";
import { shared as sharedServer } from "./shared.ts" with { graph: "react-server" };

async function node() {
  return {
    msg,
    shared: shared(),
    prerender: await prerender(server),
    sharedServer: sharedServer(),
  };
}

node().then((result) => {
  console.log(JSON.stringify(result, null, 2));
});
