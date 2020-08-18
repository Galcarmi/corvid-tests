import { TestResult } from "../TestObjects/TestResult";
import { IMatcher } from "../interfaces/IMatcher";

export function testTemplate(matcher:IMatcher, actualTest:Function):TestResult{
    matcher.initMatcher();
    matcher.before();
    const matcherResult = actualTest();
    matcher.after();
    matcher.Result = new TestResult(matcherResult, matcher.Performance.getCountMS(), matcher.Description);
    return matcher.Result;
}