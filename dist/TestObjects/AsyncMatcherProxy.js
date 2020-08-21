import { AsyncTestTemplate } from "../TestTemplates/AsyncMatcherTemplate.js";
import { deepObjectEqualsEqualer } from "./ComplicatedEqualers.js";
import { Matcher } from "./Matcher.js";
export class AsyncMatcherProxy {
    constructor(i_AsyncFunctionExpectedValue, i_BeforeFunctions, i_AfterFunctions, i_Description) {
        this.m_ExpectedPromiseValue = i_AsyncFunctionExpectedValue();
        this.m_Matcher = new Matcher(null, i_BeforeFunctions, i_AfterFunctions, i_Description);
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
        return AsyncTestTemplate(this, () => {
            this.Matcher.ExpectedValue === true;
        }, "false");
    }
    async toBeFalse() {
        return AsyncTestTemplate(this, () => this.Matcher.ExpectedValue === false, "true");
    }
    async toBeTruthy() {
        return AsyncTestTemplate(this, () => {
            if (this.Matcher.ExpectedValue) {
                return true;
            }
            else {
                return false;
            }
        }, "falsy");
    }
    async toBeFalsy() {
        return AsyncTestTemplate(this, () => {
            if (this.Matcher.ExpectedValue) {
                return false;
            }
            else {
                return true;
            }
        }, "truthy");
    }
    async toBe(i_Param) {
        return AsyncTestTemplate(this, () => this.Matcher.ExpectedValue === i_Param, i_Param);
    }
    async notToBe(i_Param) {
        return AsyncTestTemplate(this, () => this.Matcher.ExpectedValue !== i_Param, i_Param);
    }
    async toBeLessThan(i_Param) {
        return AsyncTestTemplate(this, () => this.Matcher.ExpectedValue < i_Param, i_Param.toString());
    }
    async toBeLessThanOrEqual(i_Param) {
        return AsyncTestTemplate(this, () => this.Matcher.ExpectedValue <= i_Param, i_Param.toString());
    }
    async toBeGreaterThan(i_Param) {
        return AsyncTestTemplate(this, () => this.Matcher.ExpectedValue > i_Param, i_Param.toString());
    }
    async toBeGreaterThanOrEqual(i_Param) {
        return AsyncTestTemplate(this, () => this.Matcher.ExpectedValue >= i_Param, i_Param.toString());
    }
    async deepObjectEquals(i_Obj) {
        return AsyncTestTemplate(this, () => deepObjectEqualsEqualer(this.Matcher.ExpectedValue, i_Obj), i_Obj);
    }
    async toContain(i_param) {
        return AsyncTestTemplate(this, () => {
            const result = this.Matcher.ExpectedValue.filter((value) => value === i_param);
            return result ? true : false;
        }, i_param);
    }
    async toContainEqual(i_param) {
        return AsyncTestTemplate(this, () => {
            const result = this.Matcher.ExpectedValue.filter((value) => deepObjectEqualsEqualer(value, i_param));
            return result ? true : false;
        }, i_param);
    }
    async prepareMatcher() {
        let expectedValue = await this.m_ExpectedPromiseValue;
        this.Matcher.ExpectedValue = expectedValue;
    }
}
