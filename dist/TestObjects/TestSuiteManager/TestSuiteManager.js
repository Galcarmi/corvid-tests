"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestSuiteManager = void 0;
const AsyncTestSuite_js_1 = require("../TestSuites/AsyncTestSuite.js");
const TestSuite_js_1 = require("../TestSuites/TestSuite.js");
const TestSuiteResult_js_1 = require("./TestSuiteResult.js");
class TestSuiteManager {
    constructor() {
        this.m_TestSuites = [];
        this.m_AsyncTestSuites = [];
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
        const ats = new AsyncTestSuite_js_1.AsyncTestSuite(i_TestSuiteDescription);
        this.m_AsyncTestSuites.push(ats);
        return ats;
    }
    addTestSuite(i_TestSuiteDescription) {
        const ts = new TestSuite_js_1.TestSuite(i_TestSuiteDescription);
        this.m_TestSuites.push(ts);
        return ts;
    }
    getAllTestSuitesResults() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = [];
            for (const ts of this.m_TestSuites) {
                const testsResults = ts.getAllTestsResults();
                for (const testResult of testsResults) {
                    results.push(new TestSuiteResult_js_1.TestSuiteResult(ts.Description, testResult));
                }
            }
            for (const ats of this.m_AsyncTestSuites) {
                const testsResults = yield ats.getAllTestsResults();
                for (const testResult of testsResults) {
                    results.push(new TestSuiteResult_js_1.TestSuiteResult(ats.Description, testResult));
                }
            }
            return results;
        });
    }
    getAllTestSuitesFailedResults() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = [];
            for (const ts of this.m_TestSuites) {
                const testsResults = ts.getFailedTestsResults();
                for (const testResult of testsResults) {
                    results.push(new TestSuiteResult_js_1.TestSuiteResult(ts.Description, testResult));
                }
            }
            for (const ats of this.m_AsyncTestSuites) {
                const testsResults = yield ats.getFailedTestsResults();
                for (const testResult of testsResults) {
                    results.push(new TestSuiteResult_js_1.TestSuiteResult(ats.Description, testResult));
                }
            }
            return results;
        });
    }
    getAllTestSuitesPassedResults() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = [];
            for (const ts of this.m_TestSuites) {
                const testsResults = ts.getPassedTestsResults();
                for (const testResult of testsResults) {
                    results.push(new TestSuiteResult_js_1.TestSuiteResult(ts.Description, testResult));
                }
            }
            for (const ats of this.m_AsyncTestSuites) {
                const testsResults = yield ats.getPassedTestsResults();
                for (const testResult of testsResults) {
                    results.push(new TestSuiteResult_js_1.TestSuiteResult(ats.Description, testResult));
                }
            }
            return results;
        });
    }
    isAnyFailed() {
        return __awaiter(this, void 0, void 0, function* () {
            let flag = false;
            for (const ts of this.m_TestSuites) {
                const failed = ts.getFailedTestsResults();
                if (failed) {
                    flag = true;
                }
            }
            for (const ats of this.m_AsyncTestSuites) {
                const failed = yield ats.getFailedTestsResults();
                if (failed) {
                    flag = true;
                }
            }
            return flag;
        });
    }
}
exports.TestSuiteManager = TestSuiteManager;
