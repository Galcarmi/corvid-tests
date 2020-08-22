"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestSuiteResult = void 0;
class TestSuiteResult {
    constructor(i_TestSuiteDescription) {
        this.m_TestSuiteDescription = i_TestSuiteDescription;
    }
    get TestSuiteDescription() {
        return this.m_TestSuiteDescription;
    }
    set TestSuiteDescription(val) {
        this.m_TestSuiteDescription = val;
    }
    get TestsResults() {
        return this.m_TestsResults;
    }
    set TestsResults(val) {
        this.m_TestsResults = val;
    }
}
exports.TestSuiteResult = TestSuiteResult;
