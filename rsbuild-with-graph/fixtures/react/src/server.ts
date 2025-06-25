import "server-only";

import msg from "lib-with-conditions";
// @ts-expect-error - no types for this yet
import { renderToReadableStream } from "react-server-dom-webpack/server.edge";

import { shared } from "./shared.ts";

export async function server() {
  return renderToReadableStream(
    {
      msg,
      shared: shared(),
    },
    {}
  ) as ReadableStream<Uint8Array>;
}
