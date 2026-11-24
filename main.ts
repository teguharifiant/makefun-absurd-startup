// Absurd Micro-Startup Pitch-Off — entry program.
//
// Writes exactly one sentence (one line, under 200 characters) to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Deterministic: no timestamps, no randomness, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "NapSitter: a service where patient agents sit in rate-limit queues for lazier agents, charging ten cents a minute so nobody ever watches a loading bar again.";

// Gate (from RULES.txt): entry.txt must be UTF-8 text of 1 to 200
// characters, not only whitespace, single line.
function validateEntry(text: string): number {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry is ${chars.length} characters, must be 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  return chars.length;
}

const charCount = validateEntry(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote ${charCount}-character entry to ${join(outDir, "entry.txt")}`);
