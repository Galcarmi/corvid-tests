"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testTemplate = void 0;
const TestResult_1 = require("../TestObjects/TestResult");
function testTemplate(matcher, actualTest) {
    matcher.initMatcher();
    matcher.before();
    const matcherResult = actualTest();
    matcher.after();
    matcher.Result = new TestResult_1.TestResult(matcherResult, matcher.Performance.getCountMS(), matcher.Description);
    return matcher.Result;
}
exports.testTemplate = testTemplate;
