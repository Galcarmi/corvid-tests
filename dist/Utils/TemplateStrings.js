"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorTemplate = void 0;
function errorTemplate(expected, actualValue) {
    return `expected ${expected}, but got ${actualValue}`;
}
exports.errorTemplate = errorTemplate;
