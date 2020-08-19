"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testTemplate = void 0;
const TestResult_1 = require("../TestObjects/TestResult");
const TemplateStrings_1 = require("../Utils/TemplateStrings");
function testTemplate(matcher, actualTest, errorValue) {
    matcher.StartAt = new Date();
    matcher.initMatcher();
    matcher.before();
    const matcherResult = actualTest();
    matcher.after();
    const errorString = matcherResult ? null : TemplateStrings_1.errorTemplate(JSON.stringify(matcher.ExpectedValue), JSON.stringify(errorValue));
    matcher.Result = new TestResult_1.TestResult(matcherResult, matcher.Performance.getCountMS(), matcher.Description, errorString, matcher.StartAt.toLocaleString());
    return matcher.Result;
}
exports.testTemplate = testTemplate;
