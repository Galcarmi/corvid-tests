import { ITestResult } from "../Tests/ITestResult.js";

export interface ITestSuiteResult extends ITestResult{
    TestSuiteDescription:string;
}