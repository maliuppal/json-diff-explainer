import { diffJson, type DiffOptions, type JsonChange, type JsonValue } from "json-diff-engine";
import { formatPreview } from "./format";

export interface ExplainOptions extends DiffOptions {
  /** Prefix for each line (default: none). */
  linePrefix?: string;
}

export interface ExplainResult {
  changes: JsonChange[];
  lines: string[];
  text: string;
  hasChanges: boolean;
}

function lineForChange(change: JsonChange): string {
  const p = change.path;
  switch (change.kind) {
    case "add":
      return `Added ${p} → ${formatPreview(change.after)}`;
    case "remove":
      return `Removed ${p} (was ${formatPreview(change.before)})`;
    case "type_change":
      return `Type changed at ${p}: ${change.beforeType} → ${change.afterType} (${formatPreview(change.before)} → ${formatPreview(change.after)})`;
    case "change":
      return `Changed ${p}: ${formatPreview(change.before)} → ${formatPreview(change.after)}`;
    default:
      return `Updated ${p}`;
  }
}

export function explainJsonDiff(
  before: JsonValue,
  after: JsonValue,
  options?: ExplainOptions
): ExplainResult {
  const changes = diffJson(before, after, options);
  const prefix = options?.linePrefix ?? "";
  const lines = changes.map((c) => prefix + lineForChange(c));
  return {
    changes,
    lines,
    text: lines.join("\n"),
    hasChanges: changes.length > 0,
  };
}
