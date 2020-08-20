import { TestResult } from "../TestObjects/TestResult";
import {errorTemplate} from '../Utils/TemplateStrings'
import { ITestResult } from "../interfaces/ITestResult";
import { IAsyncMatcher } from "../interfaces/IAsyncMatcher";

export async function AsyncTestTemplate(i_Matcher:IAsyncMatcher, i_ActualTest:Function, i_ErrorValue:string):Promise<ITestResult>{
    i_Matcher.StartAt = new Date();
    i_Matcher.initMatcher();
    await i_Matcher.before();
    const matcherResult = await i_ActualTest();
    await i_Matcher.after();

    const errorString = matcherResult?null:errorTemplate(JSON.stringify(i_Matcher.ExpectedValue),JSON.stringify(i_ErrorValue));
    i_Matcher.Result = new TestResult(matcherResult, i_Matcher.Performance.getCountMS(), i_Matcher.Description, errorString, i_Matcher.StartAt);
    i_Matcher.resolveTestResult(i_Matcher.Result);
    return i_Matcher.Result;
}