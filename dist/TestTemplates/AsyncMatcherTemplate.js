import { TestResult } from "../TestObjects/TestResult.js";
import { errorTemplate } from "../Utils/TemplateStrings.js";
export async function AsyncTestTemplate(i_Matcher, i_ActualTest, i_FailedValue) {
    try {
        i_Matcher.StartAt = new Date();
        i_Matcher.initMatcher();
        await i_Matcher.prepareMatcher();
        await i_Matcher.before();
        const matcherResult = await i_ActualTest();
        await i_Matcher.after();
        const errorString = matcherResult ? null : errorTemplate(JSON.stringify(i_Matcher.ExpectedValue), JSON.stringify(i_FailedValue));
        i_Matcher.Result = new TestResult(matcherResult, i_Matcher.Performance.getCountMS(), i_Matcher.Description, errorString, i_Matcher.StartAt, false, null);
        i_Matcher.resolveTestResult(i_Matcher.Result);
        return i_Matcher.Result;
    }
    catch (err) {
        i_Matcher.Result = new TestResult(false, 0, i_Matcher.Description, 'test failed', i_Matcher.StartAt, true, err.message);
        i_Matcher.resolveTestResult(i_Matcher.Result);
        return i_Matcher.Result;
    }
}
