"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncTestTemplate = void 0;
const TestResult_1 = require("../TestObjects/TestResult");
const TemplateStrings_1 = require("../Utils/TemplateStrings");
async function AsyncTestTemplate(i_Matcher, i_ActualTest, i_ErrorValue) {
    i_Matcher.StartAt = new Date();
    i_Matcher.initMatcher();
    await i_Matcher.before();
    const matcherResult = await i_ActualTest();
    await i_Matcher.after();
    const errorString = matcherResult ? null : TemplateStrings_1.errorTemplate(JSON.stringify(i_Matcher.ExpectedValue), JSON.stringify(i_ErrorValue));
    i_Matcher.Result = new TestResult_1.TestResult(matcherResult, i_Matcher.Performance.getCountMS(), i_Matcher.Description, errorString, i_Matcher.StartAt);
    i_Matcher.resolveTestResult(i_Matcher.Result);
    return i_Matcher.Result;
}
exports.AsyncTestTemplate = AsyncTestTemplate;
