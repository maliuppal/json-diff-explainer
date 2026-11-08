# json-diff-explainer

Turn two JSON values into **readable change lines** for test failures, CI logs, support tickets, and debug output. Built on **[json-diff-engine](https://www.npmjs.com/package/json-diff-engine)**—same paths and change kinds, plus formatted previews.

```js
const { explainJsonDiff } = require('json-diff-explainer');

const { text, hasChanges, lines, changes } = explainJsonDiff(
  { status: 'ok', count: 1 },
  { status: 'ok', count: 2, label: 'beta' }
);

console.log(text);
// Changed count: 1 → 2
// Added label → "beta"
```

## Install

```bash
npm install json-diff-explainer
```

`json-diff-engine` is installed automatically as a dependency.

## API

### `explainJsonDiff(before, after, options?)`

Returns:

| Field | Description |
| --- | --- |
| `changes` | Raw `JsonChange[]` from the core engine |
| `lines` | One explanation string per change |
| `text` | `lines.join('\n')` — paste into assertions or stderr |
| `hasChanges` | `true` when `changes.length > 0` |

### Options

Inherits **json-diff-core** options (`ignorePaths`, `maxArrayItems`), plus:

```js
explainJsonDiff(before, after, {
  linePrefix: '  ', // indent for nested test output
  ignorePaths: ['meta.traceId'],
});
```

## Example in tests

```js
const result = explainJsonDiff(expected, actual);
if (result.hasChanges) {
  throw new Error(`Response mismatch:\n${result.text}`);
}
```

## When to use

- Jest/Mocha assertions where `deepEqual` messages are useless
- Logging before/after snapshots in integration tests
- Internal tools that need a quick textual changelog between JSON blobs

## Related packages

- **json-diff-engine** — structured changes only (no formatting)
- **api-response-diff** — breaking vs non-breaking semantics for API bodies

## Why teams pick this

**vs printing two JSON blobs:** one `text` field for assertion errors and support tickets.

**Search terms:** json diff, explain diff, human readable, test assertion, changelog, compare json, ci logs, api debugging, typescript, node
