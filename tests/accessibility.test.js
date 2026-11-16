import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("app respects the operating system reduced-motion preference", () => {
  const app = readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
  const styles = readFileSync(new URL("../src/index.css", import.meta.url), "utf8");
  assert.match(app, /<MotionConfig reducedMotion="user">/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(styles, /scroll-behavior:\s*auto\s*!important/);
});

test("reset confirmation is a labelled modal with keyboard focus management", () => {
  const shell = readFileSync(new URL("../src/components/LearningShell.tsx", import.meta.url), "utf8");
  assert.match(shell, /role="dialog"/);
  assert.match(shell, /aria-modal="true"/);
  assert.match(shell, /aria-labelledby="reset-progress-title"/);
  assert.match(shell, /event\.key === 'Escape'/);
  assert.match(shell, /event\.key !== 'Tab'/);
  assert.match(shell, /resetDialogRef\.current\?\.focus\(\)/);
});
