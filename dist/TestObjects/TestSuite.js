import { Test } from "./Test.js";
export class TestSuite {
    constructor(i_Description) {
        this.m_Tests = [];
        this.m_Description = i_Description;
        this.m_BeforeEach = [];
        this.m_AfterEach = [];
    }
    get Description() {
        return this.m_Description;
    }
    set Description(val) {
        this.m_Description = val;
    }
    get Tests() {
        return this.m_Tests;
    }
    set Tests(val) {
        this.m_Tests = val;
    }
    get BeforeEach() {
        return this.m_BeforeEach;
    }
    set BeforeEach(val) {
        this.m_BeforeEach = val;
    }
    get AfterEach() {
        return this.m_AfterEach;
    }
    set AfterEach(val) {
        this.m_AfterEach = val;
    }
    addTest(i_TestDescription) {
        if (i_TestDescription !== "") {
            const test = new Test(i_TestDescription, this.m_BeforeEach, this.m_AfterEach);
            this.m_Tests.push(test);
            return test;
        }
        else {
            throw new Error("test is null!");
        }
    }
    getAllTestsResults() {
        const resultsArr = this.m_Tests.map((test) => {
            return test.Matcher.Result;
        });
        return resultsArr;
    }
    getPassedTestsResults() {
        const passedTests = this.m_Tests.filter((test) => {
            return test.Matcher.Result.Passed;
        });
        const passedResults = [];
        for (const failedTest of passedTests) {
            passedResults.push(failedTest.Matcher.Result);
        }
        return passedResults;
    }
    getFailedTestsResults() {
        const failedTests = this.m_Tests.filter((test) => {
            return !test.Matcher.Result.Passed;
        });
        const failedResults = [];
        for (const failedTest of failedTests) {
            failedResults.push(failedTest.Matcher.Result);
        }
        return failedResults;
    }
    addBeforeEach(i_FuncBefore) {
        this.m_BeforeEach.push(i_FuncBefore);
        return this;
    }
    addAfterEach(i_FuncAfter) {
        this.m_AfterEach.push(i_FuncAfter);
        return this;
    }
}
