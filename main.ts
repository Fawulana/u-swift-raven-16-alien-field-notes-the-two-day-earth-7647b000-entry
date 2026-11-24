// SPDX-License-Identifier: MIT
// Alien Field Notes: The Two Day Earth Review
// A deterministic, offline, stdlib-only program that writes one original
// line — a review of planet Earth left by an alien tourist — to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt when set).
// No randomness, no clock, no network: every run produces byte-identical output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "The locals built machines to wake themselves up, then added a button to argue with them. Charming planet. Four stars.";

// Gate guard: the entry must be 1–200 characters, a single line, not only
// whitespace. Fail loudly here rather than shipping an invalid entry.
if (
  REVIEW.length < 1 ||
  REVIEW.length > 200 ||
  REVIEW.includes("\n") ||
  REVIEW.trim().length === 0
) {
  throw new Error(`Review fails the gate: ${REVIEW.length} characters`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), REVIEW, "utf8");
