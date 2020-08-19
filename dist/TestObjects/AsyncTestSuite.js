"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncTestSuite = void 0;
const Test_1 = require("./Test");
class AsyncTestSuite {
    constructor(description) {
        this._tests = [];
        this._description = description;
        this._beforeEach = [];
        this._afterEach = [];
    }
    get Description() {
        return this._description;
    }
    set Description(val) {
        this._description = val;
    }
    get Tests() {
        return this._tests;
    }
    set Tests(val) {
        this._tests = val;
    }
    get BeforeEach() {
        return this._beforeEach;
    }
    set BeforeEach(val) {
        this._beforeEach = val;
    }
    get AfterEach() {
        return this._afterEach;
    }
    set AfterEach(val) {
        this._afterEach = val;
    }
    addTest(testDescription) {
        if (testDescription !== "") {
            const test = new Test_1.Test(testDescription, this._beforeEach, this._afterEach);
            this._tests.push(test);
            return test;
        }
        else {
            throw new Error("test is null!");
        }
    }
    run() {
        throw new Error("Method not implemented.");
    }
    getAllTestsResults() {
        const resultsArr = this._tests.map((test) => {
            return test.Matcher.Result;
        });
        return resultsArr;
    }
    getPassedTestsResults() {
        const passedTests = this._tests.filter((test) => {
            return test.Matcher.Result.Passed;
        });
        const passedResults = [];
        for (const failedTest of passedTests) {
            passedResults.push(failedTest.Matcher.Result);
        }
        return passedResults;
    }
    getFailedTestsResults() {
        const failedTests = this._tests.filter((test) => {
            return !(test.Matcher.Result.Passed);
        });
        const failedResults = [];
        for (const failedTest of failedTests) {
            failedResults.push(failedTest.Matcher.Result);
        }
        return failedResults;
    }
    addBeforeEach(funcBefore) {
        this._beforeEach.push(funcBefore);
        return this;
    }
    addAfterEach(funcAfter) {
        this._afterEach.push(funcAfter);
        return this;
    }
}
exports.AsyncTestSuite = AsyncTestSuite;
