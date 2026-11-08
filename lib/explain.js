"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explainJsonDiff = explainJsonDiff;
const json_diff_engine_1 = require("json-diff-engine");
const format_1 = require("./format");
function lineForChange(change) {
    const p = change.path;
    switch (change.kind) {
        case "add":
            return `Added ${p} → ${(0, format_1.formatPreview)(change.after)}`;
        case "remove":
            return `Removed ${p} (was ${(0, format_1.formatPreview)(change.before)})`;
        case "type_change":
            return `Type changed at ${p}: ${change.beforeType} → ${change.afterType} (${(0, format_1.formatPreview)(change.before)} → ${(0, format_1.formatPreview)(change.after)})`;
        case "change":
            return `Changed ${p}: ${(0, format_1.formatPreview)(change.before)} → ${(0, format_1.formatPreview)(change.after)}`;
        default:
            return `Updated ${p}`;
    }
}
function explainJsonDiff(before, after, options) {
    const changes = (0, json_diff_engine_1.diffJson)(before, after, options);
    const prefix = options?.linePrefix ?? "";
    const lines = changes.map((c) => prefix + lineForChange(c));
    return {
        changes,
        lines,
        text: lines.join("\n"),
        hasChanges: changes.length > 0,
    };
}
//# sourceMappingURL=explain.js.map