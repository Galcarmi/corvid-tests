"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorTemplate = void 0;
function errorTemplate(i_Expected, i_ActualValue) {
    return `expected ${i_Expected}, but got ${i_ActualValue}`;
}
exports.errorTemplate = errorTemplate;
