import { type DiffOptions, type JsonChange, type JsonValue } from "json-diff-engine";
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
export declare function explainJsonDiff(before: JsonValue, after: JsonValue, options?: ExplainOptions): ExplainResult;
//# sourceMappingURL=explain.d.ts.map