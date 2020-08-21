import { TestResult } from "../TestObjects/TestResult.js";
import { errorTemplate } from "../Utils/TemplateStrings.js";
export function testTemplate(i_Matcher, actualTest, errorValue) {
    i_Matcher.StartAt = new Date();
    i_Matcher.initMatcher();
    i_Matcher.before();
    const i_MatcherResult = actualTest();
    i_Matcher.after();
    const errorString = i_MatcherResult ? null : errorTemplate(JSON.stringify(i_Matcher.ExpectedValue), JSON.stringify(errorValue));
    i_Matcher.Result = new TestResult(i_MatcherResult, i_Matcher.Performance.getCountMS(), i_Matcher.Description, errorString, i_Matcher.StartAt);
    return i_Matcher.Result;
}
