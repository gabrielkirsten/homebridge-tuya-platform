"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limit = exports.remap = void 0;
function remap(value, srcStart, srcEnd, dstStart, dstEnd) {
    const percent = (value - srcStart) / (srcEnd - srcStart);
    const result = percent * (dstEnd - dstStart) + dstStart;
    return result;
}
exports.remap = remap;
function limit(value, start, end) {
    let result = value;
    result = Math.min(end, result);
    result = Math.max(start, result);
    return result;
}
exports.limit = limit;
//# sourceMappingURL=util.js.map