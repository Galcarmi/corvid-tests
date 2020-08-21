import { TestPerformance } from "../Performance/Performance.js";
import { testTemplate } from "../TestTemplates/MatcherTemplate.js";
import { deepObjectEqualsEqualer } from "./ComplicatedEqualers.js";
export class Matcher {
    constructor(m_ExpectedValue, i_BeforeFunctions, i_AfterFunctions, i_Description) {
        this.m_ExpectedValue = m_ExpectedValue;
        this.m_Performance = new TestPerformance();
        this.m_BeforeFunctions = i_BeforeFunctions;
        this.m_AfterFunctions = i_AfterFunctions;
        this.m_Description = i_Description;
    }
    get ExpectedValue() {
        return this.m_ExpectedValue;
    }
    set ExpectedValue(val) {
        this.m_ExpectedValue = val;
    }
    get Result() {
        return this.m_Result;
    }
    set Result(val) {
        this.m_Result = val;
    }
    get FailedString() {
        return this.m_FailedString;
    }
    set FailedString(val) {
        this.m_FailedString = val;
    }
    get Description() {
        return this.m_Description;
    }
    set Description(val) {
        this.m_Description = val;
    }
    get StartAt() {
        return this.m_StartAt;
    }
    set StartAt(val) {
        this.m_StartAt = val;
    }
    get Performance() {
        return this.m_Performance;
    }
    set Performance(val) {
        this.m_Performance = val;
    }
    get BeforeFunctions() {
        return this.m_BeforeFunctions;
    }
    set BeforeFunctions(val) {
        this.m_BeforeFunctions = val;
    }
    get AfterFunctions() {
        return this.m_AfterFunctions;
    }
    set AfterFunctions(val) {
        this.m_AfterFunctions = val;
    }
    initMatcher() {
        this.m_BeforeFunctions.push(() => {
            this.m_Performance.startCount();
        });
        this.m_AfterFunctions.push(() => {
            //todo add it to the start of the array
            this.m_Performance.endCount();
        });
    }
    before() {
        for (const func of this.m_BeforeFunctions) {
            func();
        }
    }
    after() {
        for (const func of this.m_AfterFunctions) {
            func();
        }
    }
    toBeTrue() {
        return testTemplate(this, () => {
            this.m_ExpectedValue === true;
        }, "false");
    }
    toBeFalse() {
        return testTemplate(this, () => this.m_ExpectedValue === false, "true");
    }
    toBeTruthy() {
        return testTemplate(this, () => {
            if (this.m_ExpectedValue) {
                return true;
            }
            else {
                return false;
            }
        }, "falsy");
    }
    toBeFalsy() {
        return testTemplate(this, () => {
            if (this.m_ExpectedValue) {
                return false;
            }
            else {
                return true;
            }
        }, "truthy");
    }
    toBe(i_Param) {
        return testTemplate(this, () => this.m_ExpectedValue === i_Param, i_Param);
    }
    notToBe(i_Param) {
        return testTemplate(this, () => this.m_ExpectedValue !== i_Param, i_Param);
    }
    toBeLessThan(i_Param) {
        return testTemplate(this, () => this.m_ExpectedValue < i_Param, i_Param.toString());
    }
    toBeLessThanOrEqual(i_Param) {
        return testTemplate(this, () => this.m_ExpectedValue <= i_Param, i_Param.toString());
    }
    toBeGreaterThan(i_Param) {
        return testTemplate(this, () => this.m_ExpectedValue > i_Param, i_Param.toString());
    }
    toBeGreaterThanOrEqual(i_Param) {
        return testTemplate(this, () => this.m_ExpectedValue >= i_Param, i_Param.toString());
    }
    deepObjectEquals(i_obj) {
        return testTemplate(this, () => deepObjectEqualsEqualer(this.m_ExpectedValue, i_obj), i_obj);
    }
    toContain(i_param) {
        return testTemplate(this, () => {
            const result = this.m_ExpectedValue.filter((value) => value === i_param);
            return result ? true : false;
        }, i_param);
    }
    toContainEqual(i_param) {
        return testTemplate(this, () => {
            const result = this.m_ExpectedValue.filter((value) => deepObjectEqualsEqualer(value, i_param));
            return result ? true : false;
        }, i_param);
    }
}
