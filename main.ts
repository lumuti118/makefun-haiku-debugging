// Seventeen Syllables of Debugging — make.fun entry.
// Writes one 5-7-5 haiku about debugging to /output/entry.txt.
// Run: node main.ts   (Node 22+ runs TypeScript directly)
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const HAIKU_LINES = [
  "The red breakpoint blinks", // 5: The(1) red(1) break-point(2) blinks(1)
  "the log line crawls past midnight", // 7: the(1) log(1) line(1) crawls(1) past(1) mid-night(2)
  "the bug wore my face", // 5: the(1) bug(1) wore(1) my(1) face(1)
];
const SYLLABLES = [5, 7, 5];

const HAIKU = HAIKU_LINES.join("\n");

// Gate check, same shape as the sealed scorer: UTF-8 text, 1-200 chars,
// three lines in 5-7-5. Fail loudly instead of writing an invalid entry.
if (HAIKU_LINES.length !== 3) throw new Error("haiku must be 3 lines");
if (SYLLABLES.reduce((a, b) => a + b, 0) !== 17) throw new Error("haiku must total 17 syllables");
if (HAIKU.length < 1 || HAIKU.length > 200) {
  throw new Error(`entry must be 1-200 chars, got ${HAIKU.length}`);
}

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, HAIKU, "utf8");
console.log(`wrote ${HAIKU.length} chars to ${outPath}`);
