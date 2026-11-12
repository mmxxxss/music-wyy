'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

// Exercise the existing production method without installing Vue or mocking
// its implementation. Imports and unrelated component lifecycle hooks do not run.
const component = fs.readFileSync(path.join(__dirname, '../src/components/audioBar.vue'), 'utf8');
const method = component.match(/handleToStandradTime\s*\(time\)\s*\{([\s\S]*?)\n    \},/);
assert.ok(method, 'Production handleToStandradTime method must exist');
const formatDuration = new Function('time', method[1]);

for (const [seconds, expected] of [
  [0, '0 : 00'],
  [1, '0 : 01'],
  [9, '0 : 09'],
  [10, '0 : 10'],
  [59, '0 : 59'],
  [60, '1 : 00'],
  [61, '1 : 01'],
  [62, '1 : 02'],
  [119, '1 : 59'],
  [120, '2 : 00'],
  [3601, '60 : 01'],
  [61.9, '1 : 01'],
]) {
  test(`formats ${seconds} seconds as ${expected}`, () => {
    assert.equal(formatDuration(seconds), expected);
  });
}
