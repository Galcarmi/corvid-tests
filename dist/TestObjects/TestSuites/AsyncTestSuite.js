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
    getAllTestsResults() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForTestsToBeResolved();
            return this.m_Results;
        });
    }
    getPassedTestsResults() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForTestsToBeResolved();
            const passedTests = this.m_Results.filter((result) => {
                return result.Passed;
            });
            return passedTests;
        });
    }
    getFailedTestsResults() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForTestsToBeResolved();
            const failedTests = this.m_Results.filter((result) => {
                return !result.Passed;
            });
            return failedTests;
        });
    }
    waitForTestsToBeResolved() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.m_AllTestsResolved) {
                const testResultsStatus = this.m_Tests.map((test) => {
                    return test.Matcher.TestResultStatus;
                });
                const results = yield Promise.all(testResultsStatus);
                this.m_Results = results;
                this.m_AllTestsResolved = true;
            }
        });
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
