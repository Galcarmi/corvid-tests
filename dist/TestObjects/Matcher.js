"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matcher = void 0;
const Performance_1 = require("../Performance/Performance");
const MatcherTemplate_1 = require("../TestTemplates/MatcherTemplate");
const ComplicatedEqualers_1 = require("./ComplicatedEqualers");
class Matcher {
    constructor(expectedValue, beforeFunctions, afterFunctions, description) {
        this.expectedValue = expectedValue;
        this._performance = new Performance_1.TestPerformance();
        this._beforeFunctions = beforeFunctions;
        this._afterFunctions = afterFunctions;
        this._description = description;
    }
    get Result() {
        return this._result;
    }
    set Result(val) {
        this._result = val;
    }
    get ErrorString() {
        return this._errorString;
    }
    set ErrorString(val) {
        this._errorString = val;
    }
    get Description() {
        return this._description;
    }
    set Description(val) {
        this._description = val;
    }
    get StartAt() {
        return this._startAt;
    }
    set StartAt(val) {
        this._startAt = val;
    }
    get Performance() {
        return this._performance;
    }
    set Performance(val) {
        this._performance = val;
    }
    get BeforeFunctions() {
        return this._beforeFunctions;
    }
    set BeforeFunctions(val) {
        this._beforeFunctions = val;
    }
    get AfterFunctions() {
        return this._afterFunctions;
    }
    set AfterFunctions(val) {
        this._afterFunctions = val;
    }
    initMatcher() {
        this._beforeFunctions.push(() => {
            this._performance.startCount();
        });
        this._afterFunctions.push(() => {
            //todo add it to the start of the array
            this._performance.endCount();
        });
    }
    before() {
        for (const func of this._beforeFunctions) {
            func();
        }
    }
    after() {
        for (const func of this._afterFunctions) {
            func();
        }
    }
    toBeTrue() {
        return MatcherTemplate_1.testTemplate(this, () => { this.expectedValue === true; });
    }
    toBeFalse() {
        return MatcherTemplate_1.testTemplate(this, () => this.expectedValue === false);
    }
    toBeTruthy() {
        return MatcherTemplate_1.testTemplate(this, () => {
            if (this.expectedValue) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    toBeFalsy() {
        return MatcherTemplate_1.testTemplate(this, () => {
            if (this.expectedValue) {
                return false;
            }
            else {
                return true;
            }
        });
    }
    equalValue(param) {
        return MatcherTemplate_1.testTemplate(this, () => this.expectedValue === param);
    }
    notEqualValue(param) {
        return MatcherTemplate_1.testTemplate(this, () => this.expectedValue !== param);
    }
    toBeLessThan(param) {
        return MatcherTemplate_1.testTemplate(this, () => this.expectedValue < param);
    }
    toBeLessThanOrEqual(param) {
        return MatcherTemplate_1.testTemplate(this, () => this.expectedValue <= param);
    }
    toBeGreaterThan(param) {
        return MatcherTemplate_1.testTemplate(this, () => this.expectedValue > param);
    }
    toBeGreaterThanOrEqual(param) {
        return MatcherTemplate_1.testTemplate(this, () => this.expectedValue >= param);
    }
    objectDeepEquals(obj) {
        return MatcherTemplate_1.testTemplate(this, () => ComplicatedEqualers_1.deepObjectEquals(this.expectedValue, obj));
    }
}
exports.Matcher = Matcher;
