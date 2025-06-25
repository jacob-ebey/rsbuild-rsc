import { defineConfig } from "@rsbuild/core";

import { withGraph } from "rsbuild-with-graph";

export default defineConfig({
  environments: {
    node: {
      source: {
        entry: { index: "./src/node.ts" },
      },
      output: {
        target: "node",
        distPath: {
          root: "./dist/node",
        },
      },
    },
  },
  plugins: [
    withGraph({
      applyToEnvironments: ["node"],
      graphs: {
        "react-server": {
          conditionNames: ["react-server"],
        },
      },
    }),
  ],
});
