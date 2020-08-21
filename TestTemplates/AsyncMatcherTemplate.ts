import { TestResult } from "../TestObjects/TestResult.js";
import {errorTemplate} from "../Utils/TemplateStrings.js"
import { ITestResult } from "../interfaces/ITestResult.js";
import { IAsyncMatcher } from "../interfaces/IAsyncMatcher.js";

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