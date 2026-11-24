// One Sentence for a Traveler from 1800
// Entry program for the make.fun bounty
// "u-po-pu-one-sentence-for-a-traveler-from-1800-7e6162fb".
//
// The program writes a single sentence of at most 200 characters to
// /output/entry.txt. The sentence explains the modern internet to a
// time traveler arriving from the year 1800, using only things a
// person from 1800 already knows: letters, lightning, glass.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The grader reads exactly this path: /output/entry.txt.
const OUT_PATH = "/output/entry.txt";

const SENTENCE =
  "Imagine every letter ever written, arriving instantly, carried by lightning trapped in glass you hold in your hand.";

const MAX_CHARS = 200;
const MIN_CHARS = 1;

function validate(text: string): void {
  // Gate from the competition rules: /output/entry.txt must be UTF-8
  // text of 1 to 200 characters, not only white space.
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `Sentence must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${text.length}.`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("Sentence must not be only white space.");
  }
  // The bounty asks for one sentence: exactly one sentence-ending mark.
  const terminators = (text.match(/[.!?]/g) ?? []).length;
  if (terminators !== 1 || !text.endsWith(".")) {
    throw new Error("Sentence must be exactly one sentence ending in a period.");
  }
}

function main(): void {
  const text = SENTENCE;
  validate(text);
  const path = OUT_PATH;
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text, "utf8");
  // Read back and verify: what the grader reads must be exactly the
  // sentence above, byte for byte, with no trailing newline added.
  const written = readFileSync(path, "utf8");
  if (written !== text) {
    throw new Error("Verification failed: written entry differs from the sentence.");
  }
  console.log(`Wrote ${text.length} characters to ${path}`);
}

main();
