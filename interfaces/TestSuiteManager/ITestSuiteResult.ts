import { ITestResult } from "../Tests/ITestResult.js";

export interface ITestSuiteResult{
    TestSuiteDescription:string;
    TestsResults:ITestResult[];
}