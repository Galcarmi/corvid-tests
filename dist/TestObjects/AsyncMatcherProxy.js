import { AsyncTestTemplate } from "../TestTemplates/AsyncMatcherTemplate.js";
import { deepObjectEquals } from "./ComplicatedEqualers.js";
import { Matcher } from "./Matcher.js";
export class AsyncMatcherProxy {
    constructor(m_ExpectedPromiseValue, i_BeforeFunctions, i_AfterFunctions, i_Description) {
        this.m_ExpectedPromiseValue = m_ExpectedPromiseValue;
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
        await this.prepareMatcher();
        return AsyncTestTemplate(this, () => {
            this.Matcher.ExpectedValue === true;
        }, "false");
    }
    async toBeFalse() {
        await this.prepareMatcher();
        return AsyncTestTemplate(this, () => this.Matcher.ExpectedValue === false, "true");
    }
    async toBeTruthy() {
        await this.prepareMatcher();
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
        await this.prepareMatcher();
        return AsyncTestTemplate(this, () => {
            if (this.Matcher.ExpectedValue) {
                return false;
            }
            else {
                return true;
            }
        }, "truthy");
    }
    async equalValue(i_Param) {
        await this.prepareMatcher();
        return AsyncTestTemplate(this, () => this.Matcher.ExpectedValue === i_Param, i_Param);
    }
    async notEqualValue(i_Param) {
        await this.prepareMatcher();
        return AsyncTestTemplate(this, () => this.Matcher.ExpectedValue !== i_Param, i_Param);
    }
    async toBeLessThan(i_Param) {
        await this.prepareMatcher();
        return AsyncTestTemplate(this, () => this.Matcher.ExpectedValue < i_Param, i_Param.toString());
    }
    async toBeLessThanOrEqual(i_Param) {
        await this.prepareMatcher();
        return AsyncTestTemplate(this, () => this.Matcher.ExpectedValue <= i_Param, i_Param.toString());
    }
    async toBeGreaterThan(i_Param) {
        await this.prepareMatcher();
        return AsyncTestTemplate(this, () => this.Matcher.ExpectedValue > i_Param, i_Param.toString());
    }
    async toBeGreaterThanOrEqual(i_Param) {
        await this.prepareMatcher();
        return AsyncTestTemplate(this, () => this.Matcher.ExpectedValue >= i_Param, i_Param.toString());
    }
    async objectDeepEquals(i_Obj) {
        await this.prepareMatcher();
        return AsyncTestTemplate(this, () => deepObjectEquals(this.Matcher.ExpectedValue, i_Obj), i_Obj);
    }
    async prepareMatcher() {
        let expectedValue = await this.m_ExpectedPromiseValue;
        this.Matcher.ExpectedValue = expectedValue;
    }
}
