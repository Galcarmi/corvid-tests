import { TestResult } from "../TestObjects/TestResult";
import { IMatcher } from "../interfaces/IMatcher";
import {errorTemplate} from '../Utils/TemplateStrings'
import { ITestResult } from "../interfaces/ITestResult";

export function testTemplate(matcher:IMatcher, actualTest:Function, errorValue:string):ITestResult{
    matcher.StartAt = new Date();
    matcher.initMatcher();
    matcher.before();
    const matcherResult = actualTest();
    matcher.after();

    const errorString = matcherResult?null:errorTemplate(JSON.stringify(matcher.ExpectedValue),JSON.stringify(errorValue));
    matcher.Result = new TestResult(matcherResult, matcher.Performance.getCountMS(), matcher.Description, errorString, matcher.StartAt);
    return matcher.Result;
}