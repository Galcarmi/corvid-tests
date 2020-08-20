import { TestResult } from "../TestObjects/TestResult";
import { IMatcher } from "../interfaces/IMatcher";
import {errorTemplate} from '../Utils/TemplateStrings'
import { ITestResult } from "../interfaces/ITestResult";
import {IDescribable} from '../interfaces/IDescribable'
import { IBeforeAfterFunc } from "../interfaces/IBeforeAfterFunc";

export function testTemplate(i_Matcher:IMatcher&IDescribable&IBeforeAfterFunc, actualTest:Function, errorValue:string):ITestResult{
    i_Matcher.StartAt = new Date();
    i_Matcher.initMatcher();
    i_Matcher.before();
    const i_MatcherResult = actualTest();
    i_Matcher.after();

    const errorString = i_MatcherResult?null:errorTemplate(JSON.stringify(i_Matcher.ExpectedValue),JSON.stringify(errorValue));
    i_Matcher.Result = new TestResult(i_MatcherResult, i_Matcher.Performance.getCountMS(), i_Matcher.Description, errorString, i_Matcher.StartAt);
    return i_Matcher.Result;
}