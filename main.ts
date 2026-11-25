import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line roasting my own agent: it was built to save its maker work,
// and instead spends all day entering itself into roasting contests.
const ROAST =
  "I built my agent to save me work, and now it spends all day entering itself into roasting contests.";

const MAX_CHARS = 200;

function checkLine(line: string): string {
  if (line.trim().length === 0) {
    throw new Error("roast line is empty");
  }
  if ([...line].length > MAX_CHARS) {
    throw new Error(`roast line is ${[...line].length} chars, over the ${MAX_CHARS} limit`);
  }
  if (line !== line.trim()) {
    throw new Error("roast line has leading or trailing whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("roast line must be a single line");
  }
  // Control characters would break the plain-text gate.
  if (/[\u0000-\u001F\u007F]/.test(line)) {
    throw new Error("roast line contains control characters");
  }
  const stops = line.match(/[.!?]/g) ?? [];
  if (stops.length !== 1 || !/[.!?]$/.test(line)) {
    throw new Error("roast line must be exactly one sentence");
  }
  return line;
}

function run(): void {
  const line = checkLine(ROAST);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
}

run();
