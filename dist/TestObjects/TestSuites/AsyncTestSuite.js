"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncTestSuite = void 0;
const AsyncTest_js_1 = require("../Tests/AsyncTest.js");
class AsyncTestSuite {
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
    addTest(i_testDescription) {
        if (i_testDescription !== "") {
            const test = new AsyncTest_js_1.AsyncTest(i_testDescription, this.m_BeforeEach, this.m_AfterEach);
            this.m_Tests.push(test);
            return test;
        }
        else {
            throw new Error("test is null!");
        }
    }
    async getAllTestsResults() {
        await this.waitForTestsToBeResolved();
        return this.m_Results;
    }
    async getPassedTestsResults() {
        await this.waitForTestsToBeResolved();
        const passedTests = this.m_Results.filter((result) => {
            return result.Passed;
        });
        return passedTests;
    }
    async getFailedTestsResults() {
        await this.waitForTestsToBeResolved();
        const failedTests = this.m_Results.filter((result) => {
            return !result.Passed;
        });
        return failedTests;
    }
    async waitForTestsToBeResolved() {
        const results = [];
        if (!this.m_AllTestsResolved) {
            for (const test of this.m_Tests) {
                test.Matcher.execute();
                const result = await test.Matcher.ExpectedValuePromise;
                results.push(result);
            }
            this.m_Results = results;
            this.m_AllTestsResolved = true;
        }
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
exports.AsyncTestSuite = AsyncTestSuite;
