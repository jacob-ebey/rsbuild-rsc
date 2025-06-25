import msg from "lib-with-conditions";
// @ts-expect-error - no types for this yet
import { createFromReadableStream } from "react-server-dom-webpack/client.edge";

import { shared } from "./shared.ts";

export async function prerender(callServer: () => Promise<ReadableStream>) {
  const stream = await callServer();
  const decoded = await createFromReadableStream(stream, {
    serverConsumerManifest: { moduleMap: {} },
  });
  return {
    msg,
    shared: shared(),
    decoded,
  };
}
