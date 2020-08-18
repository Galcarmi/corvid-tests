"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestSuite = void 0;
const Test_1 = require("./Test");
class TestSuite {
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
    getResults() {
        const resultsArr = this._tests.map((test) => {
            return test.Matcher.Result;
        });
        return resultsArr;
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
exports.TestSuite = TestSuite;
