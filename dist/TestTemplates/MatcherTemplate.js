"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testTemplate = void 0;
const TestResult_1 = require("../TestObjects/TestResult");
const TemplateStrings_1 = require("../Utils/TemplateStrings");
function testTemplate(i_Matcher, actualTest, errorValue) {
    i_Matcher.StartAt = new Date();
    i_Matcher.initMatcher();
    i_Matcher.before();
    const i_MatcherResult = actualTest();
    i_Matcher.after();
    const errorString = i_MatcherResult ? null : TemplateStrings_1.errorTemplate(JSON.stringify(i_Matcher.ExpectedValue), JSON.stringify(errorValue));
    i_Matcher.Result = new TestResult_1.TestResult(i_MatcherResult, i_Matcher.Performance.getCountMS(), i_Matcher.Description, errorString, i_Matcher.StartAt);
    return i_Matcher.Result;
}
exports.testTemplate = testTemplate;
