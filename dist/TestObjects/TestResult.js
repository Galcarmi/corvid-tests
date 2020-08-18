"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestResult = void 0;
class TestResult {
    constructor(passed, timePassed, description) {
        this._passed = passed;
        this._timePassed = timePassed;
        this._description = description;
    }
    get Passed() {
        return this._passed;
    }
    set Passed(val) {
        this._passed = val;
    }
    get TimePassed() {
        return this._timePassed;
    }
    set TimePassed(val) {
        this._timePassed = val;
    }
    get Description() {
        return this._description;
    }
    set Description(val) {
        this._description = val;
    }
    get ErrorString() {
        return this._errorString;
    }
    set ErrorString(val) {
        this._errorString = val;
    }
    toString() {
        return `${this._description} - ${this._passed ? 'passed' : 'failed'} - ${this._passed}ms`;
    }
}
exports.TestResult = TestResult;
