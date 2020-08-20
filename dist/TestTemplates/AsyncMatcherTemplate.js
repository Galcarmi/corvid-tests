"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncTestTemplate = void 0;
const TestResult_1 = require("../TestObjects/TestResult");
const TemplateStrings_1 = require("../Utils/TemplateStrings");
async function AsyncTestTemplate(matcher, actualTest, errorValue) {
    matcher.StartAt = new Date();
    matcher.initMatcher();
    await matcher.before();
    const matcherResult = await actualTest();
    await matcher.after();
    const errorString = matcherResult ? null : TemplateStrings_1.errorTemplate(JSON.stringify(matcher.ExpectedValue), JSON.stringify(errorValue));
    matcher.Result = new TestResult_1.TestResult(matcherResult, matcher.Performance.getCountMS(), matcher.Description, errorString, matcher.StartAt);
    matcher.resolveTestResult(matcher.Result);
    return matcher.Result;
}
exports.AsyncTestTemplate = AsyncTestTemplate;
