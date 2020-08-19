"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncMatcherProxy = void 0;
const AsyncMatcherTemplate_1 = require("../TestTemplates/AsyncMatcherTemplate");
const ComplicatedEqualers_1 = require("./ComplicatedEqualers");
const Matcher_1 = require("./Matcher");
class AsyncMatcherProxy {
    constructor(_expectedPromiseValue, beforeFunctions, afterFunctions, description) {
        this._expectedPromiseValue = _expectedPromiseValue;
        this._matcher = new Matcher_1.Matcher(null, beforeFunctions, afterFunctions, description);
    }
    get ExpectedValue() {
        return this.Matcher.ExpectedValue;
    }
    set ExpectedValue(val) {
        this.Matcher.ExpectedValue = val;
    }
    get Result() {
        return this.Matcher.Result;
    }
    set Result(val) {
        this.Matcher.Result = val;
    }
    get ErrorString() {
        return this.Matcher.ErrorString;
    }
    set ErrorString(val) {
        this.Matcher.ErrorString = val;
    }
    get Description() {
        return this.Matcher.Description;
    }
    set Description(val) {
        this.Matcher.Description = val;
    }
    get StartAt() {
        return this.Matcher.StartAt;
    }
    set StartAt(val) {
        this.Matcher.StartAt = val;
    }
    get Performance() {
        return this.Matcher.Performance;
    }
    set Performance(val) {
        this.Matcher.Performance = val;
    }
    get BeforeFunctions() {
        return this.Matcher.BeforeFunctions;
    }
    set BeforeFunctions(val) {
        this.Matcher.BeforeFunctions = val;
    }
    get AfterFunctions() {
        return this.Matcher.AfterFunctions;
    }
    set AfterFunctions(val) {
        this.Matcher.AfterFunctions = val;
    }
    ///todo check why it has to be type of any
    get Matcher() {
        return this._matcher;
    }
    set Matcher(val) {
        this._matcher = val;
    }
    initMatcher() {
        this.Matcher.BeforeFunctions.push(() => {
            this.Matcher.Performance.startCount();
        });
        this.Matcher.AfterFunctions.unshift(() => {
            this.Matcher.Performance.endCount();
        });
    }
    async before() {
        for (const func of this.Matcher.BeforeFunctions) {
            await func();
        }
    }
    async after() {
        for (const func of this.Matcher.AfterFunctions) {
            await func();
        }
    }
    async toBeTrue() {
        await this.prepareMatcher();
        return AsyncMatcherTemplate_1.AsyncTestTemplate(this, () => { this.Matcher.ExpectedValue === true; }, 'false');
    }
    async toBeFalse() {
        await this.prepareMatcher();
        return AsyncMatcherTemplate_1.AsyncTestTemplate(this, () => this.Matcher.ExpectedValue === false, 'true');
    }
    async toBeTruthy() {
        await this.prepareMatcher();
        return AsyncMatcherTemplate_1.AsyncTestTemplate(this, () => {
            if (this.Matcher.ExpectedValue) {
                return true;
            }
            else {
                return false;
            }
        }, 'falsy');
    }
    async toBeFalsy() {
        await this.prepareMatcher();
        return AsyncMatcherTemplate_1.AsyncTestTemplate(this, () => {
            if (this.Matcher.ExpectedValue) {
                return false;
            }
            else {
                return true;
            }
        }, 'truthy');
    }
    async equalValue(param) {
        await this.prepareMatcher();
        return AsyncMatcherTemplate_1.AsyncTestTemplate(this, () => this.Matcher.ExpectedValue === param, param);
    }
    async notEqualValue(param) {
        await this.prepareMatcher();
        return AsyncMatcherTemplate_1.AsyncTestTemplate(this, () => this.Matcher.ExpectedValue !== param, param);
    }
    async toBeLessThan(param) {
        await this.prepareMatcher();
        return AsyncMatcherTemplate_1.AsyncTestTemplate(this, () => this.Matcher.ExpectedValue < param, param.toString());
    }
    async toBeLessThanOrEqual(param) {
        await this.prepareMatcher();
        return AsyncMatcherTemplate_1.AsyncTestTemplate(this, () => this.Matcher.ExpectedValue <= param, param.toString());
    }
    async toBeGreaterThan(param) {
        await this.prepareMatcher();
        return AsyncMatcherTemplate_1.AsyncTestTemplate(this, () => this.Matcher.ExpectedValue > param, param.toString());
    }
    async toBeGreaterThanOrEqual(param) {
        await this.prepareMatcher();
        return AsyncMatcherTemplate_1.AsyncTestTemplate(this, () => this.Matcher.ExpectedValue >= param, param.toString());
    }
    async objectDeepEquals(obj) {
        await this.prepareMatcher();
        return AsyncMatcherTemplate_1.AsyncTestTemplate(this, () => ComplicatedEqualers_1.deepObjectEquals(this.Matcher.ExpectedValue, obj), obj);
    }
    async prepareMatcher() {
        let expectedValue = await this._expectedPromiseValue;
        this.Matcher.ExpectedValue = expectedValue;
    }
}
exports.AsyncMatcherProxy = AsyncMatcherProxy;
