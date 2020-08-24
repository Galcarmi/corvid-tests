"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestSuiteManager = void 0;
const AsyncTestSuite_js_1 = require("../TestSuites/AsyncTestSuite.js");
const TestSuiteResult_js_1 = require("./TestSuiteResult.js");
const testsReader_js_1 = require("../../TestsReader/testsReader.js");
class TestSuiteManager {
    constructor() {
        this.m_AsyncTestSuites = [];
    }
    get IAsyncTestSuite() {
        return this.m_AsyncTestSuites;
    }
    set AsyncTestSuites(val) {
        this.m_AsyncTestSuites = val;
    }
    describe(i_TestSuiteDescription) {
        const ats = new AsyncTestSuite_js_1.AsyncTestSuite(i_TestSuiteDescription);
        this.m_AsyncTestSuites.push(ats);
        return ats;
    }
    async getResults() {
        const results = [];
        for (const ats of this.m_AsyncTestSuites) {
            const testsResults = await ats.getResults();
            const tsResults = new TestSuiteResult_js_1.TestSuiteResult(ats.Description);
            tsResults.TestsResults = testsResults;
            results.push(tsResults);
        }
        return results;
    }
    async getFailed() {
        const results = [];
        for (const ats of this.m_AsyncTestSuites) {
            const testsResults = await ats.getFailed();
            const tsResults = new TestSuiteResult_js_1.TestSuiteResult(ats.Description);
            tsResults.TestsResults = testsResults;
            results.push(tsResults);
        }
        return results;
    }
    async getPassed() {
        const results = [];
        for (const ats of this.m_AsyncTestSuites) {
            const testsResults = await ats.getPassed();
            const tsResults = new TestSuiteResult_js_1.TestSuiteResult(ats.Description);
            tsResults.TestsResults = testsResults;
            results.push(tsResults);
        }
        return results;
    }
    async isAnyFailed() {
        let flag = false;
        for (const ats of this.m_AsyncTestSuites) {
            const failed = await ats.getFailed();
            if (failed) {
                flag = true;
                break;
            }
        }
        return flag;
    }
    async getResultsG() {
        const results = [];
        for (const ats of this.m_AsyncTestSuites) {
            const testsResults = await ats.getResults();
            for (const testResult of testsResults) {
                results.push(testResult);
            }
        }
        return results;
    }
    async waitForAsyncTestsToBeResolved() {
        for (const ats of this.m_AsyncTestSuites) {
            await ats.waitForTestsToBeResolved();
        }
    }
    async execute() {
        await testsReader_js_1.executeTestsReader();
    }
}
exports.TestSuiteManager = TestSuiteManager;
