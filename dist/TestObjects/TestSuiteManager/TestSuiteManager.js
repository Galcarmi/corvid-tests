"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestSuiteManager = void 0;
const AsyncTestSuite_js_1 = require("../TestSuites/AsyncTestSuite.js");
const TestSuite_js_1 = require("../TestSuites/TestSuite.js");
const TestSuiteResult_js_1 = require("./TestSuiteResult.js");
const testsReader_js_1 = require("../../TestsReader/testsReader.js");
const BusyManager_1 = require("./BusyManager");
const Lock_js_1 = require("./Lock.js");
class TestSuiteManager {
    constructor() {
        this.m_TestSuites = [];
        this.m_AsyncTestSuites = [];
        this.m_BusyManager = BusyManager_1.busyManager;
    }
    get TestSuites() {
        return this.m_TestSuites;
    }
    set TestSuites(val) {
        this.m_TestSuites = val;
    }
    get IAsyncTestSuite() {
        return this.m_AsyncTestSuites;
    }
    set AsyncTestSuites(val) {
        this.m_AsyncTestSuites = val;
    }
    addAsyncTestSuite(i_TestSuiteDescription) {
        ///todo handle lock
        const lock = new Lock_js_1.Lock();
        this.m_BusyManager.addLock(lock);
        const ats = new AsyncTestSuite_js_1.AsyncTestSuite(i_TestSuiteDescription, lock);
        this.m_AsyncTestSuites.push(ats);
        return ats;
    }
    addTestSuite(i_TestSuiteDescription) {
        const ts = new TestSuite_js_1.TestSuite(i_TestSuiteDescription);
        this.m_TestSuites.push(ts);
        return ts;
    }
    async getAllTestSuitesResults() {
        const results = [];
        for (const ts of this.m_TestSuites) {
            const testsResults = ts.getAllTestsResults();
            const tsResults = new TestSuiteResult_js_1.TestSuiteResult(ts.Description);
            tsResults.TestsResults = testsResults;
            results.push(tsResults);
            // for (const testResult of testsResults) {
            //   results.push(new TestSuiteResult(ts.Description, testResult));
            // }
        }
        for (const ats of this.m_AsyncTestSuites) {
            const testsResults = await ats.getAllTestsResults();
            const tsResults = new TestSuiteResult_js_1.TestSuiteResult(ats.Description);
            tsResults.TestsResults = testsResults;
            results.push(tsResults);
            // for (const testResult of testsResults) {
            //   results.push(new TestSuiteResult(ats.Description, testResult));
            // }
        }
        return results;
    }
    async getAllTestSuitesFailedResults() {
        const results = [];
        for (const ts of this.m_TestSuites) {
            const testsResults = ts.getFailedTestsResults();
            const tsResults = new TestSuiteResult_js_1.TestSuiteResult(ts.Description);
            tsResults.TestsResults = testsResults;
            results.push(tsResults);
            // for (const testResult of testsResults) {
            //   results.push(new TestSuiteResult(ts.Description, testResult));
            // }
        }
        for (const ats of this.m_AsyncTestSuites) {
            const testsResults = await ats.getFailedTestsResults();
            const tsResults = new TestSuiteResult_js_1.TestSuiteResult(ats.Description);
            tsResults.TestsResults = testsResults;
            results.push(tsResults);
            // for (const testResult of testsResults) {
            //   results.push(new TestSuiteResult(ats.Description, testResult));
            // }
        }
        return results;
    }
    async getAllTestSuitesPassedResults() {
        const results = [];
        for (const ts of this.m_TestSuites) {
            const testsResults = ts.getPassedTestsResults();
            const tsResults = new TestSuiteResult_js_1.TestSuiteResult(ts.Description);
            tsResults.TestsResults = testsResults;
            results.push(tsResults);
            // for (const testResult of testsResults) {
            //   results.push(new TestSuiteResult(ts.Description, testResult));
            // }
        }
        for (const ats of this.m_AsyncTestSuites) {
            const testsResults = await ats.getPassedTestsResults();
            const tsResults = new TestSuiteResult_js_1.TestSuiteResult(ats.Description);
            tsResults.TestsResults = testsResults;
            results.push(tsResults);
            // for (const testResult of testsResults) {
            //   results.push(new TestSuiteResult(ats.Description, testResult));
            // }
        }
        return results;
    }
    async isAnyFailed() {
        let flag = false;
        for (const ts of this.m_TestSuites) {
            const failed = ts.getFailedTestsResults();
            if (failed) {
                flag = true;
            }
        }
        for (const ats of this.m_AsyncTestSuites) {
            const failed = await ats.getFailedTestsResults();
            if (failed) {
                flag = true;
            }
        }
        return flag;
    }
    async getAllTestSuitesResultsG() {
        const results = [];
        for (const ts of this.m_TestSuites) {
            const testsResults = ts.getAllTestsResults();
            for (const testResult of testsResults) {
                results.push(testResult);
            }
        }
        for (const ats of this.m_AsyncTestSuites) {
            const testsResults = await ats.getAllTestsResults();
            for (const testResult of testsResults) {
                results.push(testResult);
            }
        }
        return results;
    }
    async execute() {
        await testsReader_js_1.executeTestsReader();
    }
}
exports.TestSuiteManager = TestSuiteManager;
