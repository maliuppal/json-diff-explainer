import type { JsonValue } from "json-diff-engine";

const PREVIEW_LEN = 80;

function preview(value: JsonValue | undefined): string {
  if (value === undefined) return "undefined";
  let raw: string;
  try {
    raw = JSON.stringify(value);
  } catch {
    return String(value);
  }
  if (raw.length > PREVIEW_LEN) {
    return raw.slice(0, PREVIEW_LEN - 1) + "…";
  }
  return raw;
}

export function formatPreview(value: JsonValue | undefined): string {
  return preview(value);
}
