import { TestResult } from "../TestObjects/TestResult";
import {errorTemplate} from '../Utils/TemplateStrings'
import { ITestResult } from "../interfaces/ITestResult";
import { IAsyncMatcher } from "../interfaces/IAsyncMatcher";

export async function AsyncTestTemplate(matcher:IAsyncMatcher, actualTest:Function, errorValue:string):Promise<ITestResult>{
    matcher.StartAt = new Date();
    matcher.initMatcher();
    await matcher.before();
    const matcherResult = await actualTest();
    await matcher.after();

    const errorString = matcherResult?null:errorTemplate(JSON.stringify(matcher.ExpectedValue),JSON.stringify(errorValue));
    matcher.Result = new TestResult(matcherResult, matcher.Performance.getCountMS(), matcher.Description, errorString, matcher.StartAt);
    return matcher.Result;
}