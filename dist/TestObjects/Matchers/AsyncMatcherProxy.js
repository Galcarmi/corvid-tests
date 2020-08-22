"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncMatcherProxy = void 0;
const ComplicatedEqualers_js_1 = require("../Utils/ComplicatedEqualers.js");
const Matcher_js_1 = require("./Matcher.js");
const TestResult_js_1 = require("../Tests/TestResult.js");
const TemplateStrings_js_1 = require("../../Utils/TemplateStrings.js");
class AsyncMatcherProxy {
    constructor(i_AsyncFunctionExpectedValue, i_BeforeFunctions, i_AfterFunctions, i_Description, i_Lock) {
        this.m_Lock = i_Lock;
        this.m_ExpectedPromiseValue = i_AsyncFunctionExpectedValue();
        this.m_Matcher = new Matcher_js_1.Matcher(null, i_BeforeFunctions, i_AfterFunctions, i_Description);
        this.m_TestResultStatus = new Promise((res, rej) => {
            this.m_TestResultResolver = res;
        });
    }
    get TestResultStatus() {
        return this.m_TestResultStatus;
    }
    set TestResultStatus(val) {
        this.m_TestResultStatus = val;
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
    get FailedString() {
        return this.Matcher.FailedString;
    }
    set FailedString(val) {
        this.Matcher.FailedString = val;
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
        return this.m_Matcher;
    }
    set Matcher(val) {
        this.m_Matcher = val;
    }
    resolveTestResult(i_TestResult) {
        this.m_TestResultResolver(i_TestResult);
    }
    initMatcher() {
        this.Matcher.BeforeFunctions.unshift(() => {
            this.Matcher.Performance.startCount();
        });
        this.Matcher.AfterFunctions.push(() => {
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
        return this.asyncTestTemplate(() => {
            this.Matcher.ExpectedValue === true;
        }, "false");
    }
    async toBeFalse() {
        return this.asyncTestTemplate(() => this.Matcher.ExpectedValue === false, "true");
    }
    async toBeTruthy() {
        return this.asyncTestTemplate(() => {
            if (this.Matcher.ExpectedValue) {
                return true;
            }
            else {
                return false;
            }
        }, "falsy");
    }
    async toBeFalsy() {
        return this.asyncTestTemplate(() => {
            if (this.Matcher.ExpectedValue) {
                return false;
            }
            else {
                return true;
            }
        }, "truthy");
    }
    async toBe(i_Param) {
        return this.asyncTestTemplate(() => this.Matcher.ExpectedValue === i_Param, i_Param);
    }
    async notToBe(i_Param) {
        return this.asyncTestTemplate(() => this.Matcher.ExpectedValue !== i_Param, i_Param);
    }
    async toBeLessThan(i_Param) {
        return this.asyncTestTemplate(() => this.Matcher.ExpectedValue < i_Param, i_Param.toString());
    }
    async toBeLessThanOrEqual(i_Param) {
        return this.asyncTestTemplate(() => this.Matcher.ExpectedValue <= i_Param, i_Param.toString());
    }
    async toBeGreaterThan(i_Param) {
        return this.asyncTestTemplate(() => this.Matcher.ExpectedValue > i_Param, i_Param.toString());
    }
    async toBeGreaterThanOrEqual(i_Param) {
        return this.asyncTestTemplate(() => this.Matcher.ExpectedValue >= i_Param, i_Param.toString());
    }
    async deepObjectEquals(i_Obj) {
        return this.asyncTestTemplate(() => ComplicatedEqualers_js_1.deepObjectEqualsEqualer(this.Matcher.ExpectedValue, i_Obj), i_Obj);
    }
    async toContain(i_param) {
        return this.asyncTestTemplate(() => {
            const result = this.Matcher.ExpectedValue.filter((value) => value === i_param);
            return result ? true : false;
        }, i_param);
    }
    async toContainEqual(i_param) {
        return this.asyncTestTemplate(() => {
            const result = this.Matcher.ExpectedValue.filter((value) => ComplicatedEqualers_js_1.deepObjectEqualsEqualer(value, i_param));
            return result ? true : false;
        }, i_param);
    }
    async prepareMatcher() {
        let expectedValue = await this.m_ExpectedPromiseValue;
        this.Matcher.ExpectedValue = expectedValue;
    }
    async asyncTestTemplate(i_ActualTest, i_FailedValue) {
        try {
            this.StartAt = new Date();
            this.initMatcher();
            await this.prepareMatcher();
            await this.before();
            const matcherResult = await i_ActualTest();
            await this.after();
            const errorString = matcherResult ? null : TemplateStrings_js_1.errorTemplate(JSON.stringify(this.ExpectedValue), JSON.stringify(i_FailedValue));
            this.Result = new TestResult_js_1.TestResult(matcherResult, this.Performance.getCountMS(), this.Description, errorString, this.StartAt, false, null);
            this.resolveTestResult(this.Result);
            ///todo handle lock
            this.m_Lock.unlock();
            return this.Result;
        }
        catch (err) {
            this.Result = new TestResult_js_1.TestResult(false, 0, this.Description, 'test failed', this.StartAt, true, err.message);
            this.resolveTestResult(this.Result);
            return this.Result;
        }
    }
}
exports.AsyncMatcherProxy = AsyncMatcherProxy;
