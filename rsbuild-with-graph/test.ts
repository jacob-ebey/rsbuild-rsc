import * as cp from "node:child_process";
import * as fs from "node:fs/promises";
import { test } from "node:test";
import { promisify } from "node:util";

import { expect } from "expect";

const execAsync = promisify(cp.exec);

const fixtures = ["basic", "react"];

function cleanOutput(str: string): string {
  const split = str.trim().split("\n");
  return split.slice(2).join("\n").trim();
}

for (const fixture of fixtures) {
  test(`fixture: ${fixture}`, async (t) => {
    // run npm run build
    const { stdout: buildOutput } = await execAsync("pnpm build", {
      cwd: `./fixtures/${fixture}`,
    });
    expect(buildOutput.toString()).toMatch(/ready/);

    if (process.env["UPDATE_SNAPSHOTS"]) {
      const { stdout: runOutput } = await execAsync("pnpm start", {
        cwd: `./fixtures/${fixture}`,
      });
      await fs.writeFile(
        `./fixtures/${fixture}/output.txt`,
        cleanOutput(runOutput.toString()),
        "utf-8"
      );
    }

    const expected = await fs.readFile(
      `./fixtures/${fixture}/output.txt`,
      "utf-8"
    );
    const { stdout: runOutput } = await execAsync("pnpm start", {
      cwd: `./fixtures/${fixture}`,
    });
    expect(cleanOutput(runOutput.toString())).toBe(expected);
  });
}
