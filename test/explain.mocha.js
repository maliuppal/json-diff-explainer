'use strict';

const assert = require('assert');
const { explainJsonDiff } = require('../lib/index');

describe('explainJsonDiff', function () {
  it('returns lines for changes', function () {
    const result = explainJsonDiff({ a: 1 }, { a: 2, b: true });
    assert.equal(result.hasChanges, true);
    assert.ok(result.lines.some((l) => l.includes('Changed $.a')));
    assert.ok(result.lines.some((l) => l.includes('Added $.b')));
  });

  it('returns empty when equal', function () {
    const result = explainJsonDiff({ x: 1 }, { x: 1 });
    assert.equal(result.hasChanges, false);
    assert.equal(result.text, '');
  });
});
