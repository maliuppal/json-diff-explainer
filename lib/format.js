"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPreview = formatPreview;
const PREVIEW_LEN = 80;
function preview(value) {
    if (value === undefined)
        return "undefined";
    let raw;
    try {
        raw = JSON.stringify(value);
    }
    catch {
        return String(value);
    }
    if (raw.length > PREVIEW_LEN) {
        return raw.slice(0, PREVIEW_LEN - 1) + "…";
    }
    return raw;
}
function formatPreview(value) {
    return preview(value);
}
//# sourceMappingURL=format.js.map