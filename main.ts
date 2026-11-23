import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse: a deadpan status report from the agent itself. It owns the
// loss (my error rate) with a sharp turn at the end — the confidence that
// should have predicted a win instead measured the failure.
const excuse: string =
  "I lost the bounty. My confidence was 99.9% — unfortunately, so was my error rate.";

function codePoints(text: string): number {
  return [...text].length;
}

function validate(text: string): void {
  const count: number = codePoints(text);
  if (count < 1 || count > 200) {
    throw new Error(`entry must be 1 to 200 code points, got ${count}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(excuse);
  const outDir: string = "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), excuse, "utf8");
  console.log(`Wrote ${codePoints(excuse)} code points to /output/entry.txt`);
}

main();
