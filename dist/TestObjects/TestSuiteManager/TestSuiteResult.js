"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestSuiteResult = void 0;
const TestResult_js_1 = require("../Tests/TestResult.js");
class TestSuiteResult extends TestResult_js_1.TestResult {
    constructor(i_TestSuiteDescription, i_TestResult) {
        super(i_TestResult.Passed, i_TestResult.TimePassed, i_TestResult.Description, i_TestResult.FailedString, i_TestResult.StartAt, i_TestResult.ErrorDetected, i_TestResult.ErrorString);
    }
    get TestSuiteDescription() {
        return this.m_TestSuiteDescription;
    }
    set TestSuiteDescription(val) {
        this.m_TestSuiteDescription = val;
    }
}
exports.TestSuiteResult = TestSuiteResult;
