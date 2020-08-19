"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matcher = void 0;
const Performance_1 = require("../Performance/Performance");
const MatcherTemplate_1 = require("../TestTemplates/MatcherTemplate");
const ComplicatedEqualers_1 = require("./ComplicatedEqualers");
class Matcher {
    constructor(_expectedValue, beforeFunctions, afterFunctions, description) {
        this._expectedValue = _expectedValue;
        this._performance = new Performance_1.TestPerformance();
        this._beforeFunctions = beforeFunctions;
        this._afterFunctions = afterFunctions;
        this._description = description;
    }
    get ExpectedValue() {
        return this._expectedValue;
    }
    set ExpectedValue(val) {
        this._expectedValue = val;
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
        return MatcherTemplate_1.testTemplate(this, () => { this._expectedValue === true; }, 'false');
    }
    toBeFalse() {
        return MatcherTemplate_1.testTemplate(this, () => this._expectedValue === false, 'true');
    }
    toBeTruthy() {
        return MatcherTemplate_1.testTemplate(this, () => {
            if (this._expectedValue) {
                return true;
            }
            else {
                return false;
            }
        }, 'falsy');
    }
    toBeFalsy() {
        return MatcherTemplate_1.testTemplate(this, () => {
            if (this._expectedValue) {
                return false;
            }
            else {
                return true;
            }
        }, 'truthy');
    }
    equalValue(param) {
        return MatcherTemplate_1.testTemplate(this, () => this._expectedValue === param, param);
    }
    notEqualValue(param) {
        return MatcherTemplate_1.testTemplate(this, () => this._expectedValue !== param, param);
    }
    toBeLessThan(param) {
        return MatcherTemplate_1.testTemplate(this, () => this._expectedValue < param, param.toString());
    }
    toBeLessThanOrEqual(param) {
        return MatcherTemplate_1.testTemplate(this, () => this._expectedValue <= param, param.toString());
    }
    toBeGreaterThan(param) {
        return MatcherTemplate_1.testTemplate(this, () => this._expectedValue > param, param.toString());
    }
    toBeGreaterThanOrEqual(param) {
        return MatcherTemplate_1.testTemplate(this, () => this._expectedValue >= param, param.toString());
    }
    objectDeepEquals(obj) {
        return MatcherTemplate_1.testTemplate(this, () => ComplicatedEqualers_1.deepObjectEquals(this._expectedValue, obj), obj);
    }
}
exports.Matcher = Matcher;
