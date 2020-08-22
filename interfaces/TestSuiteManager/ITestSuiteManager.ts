import { ISyncTestSuite } from "../TestSuite/ISyncTestSuite.js";
import { IAsyncTestSuite } from "../TestSuite/IAsyncTestSuite.js";
import { ITestSuiteResult } from "./ITestSuiteResult.js";
import { ITestResult } from "../Tests/ITestResult.js";

export interface ITestSuiteManager{
    TestSuites:ISyncTestSuite[];
    AsyncTestSuites:IAsyncTestSuite[];

    addAsyncTestSuite(i_testSuiteName:string):IAsyncTestSuite;
    addTestSuite(i_testSuiteName:string):ISyncTestSuite;
    getAllTestSuitesResults():Promise<ITestSuiteResult[]> ;
    getAllTestSuitesFailedResults():Promise<ITestSuiteResult[]> ;
    getAllTestSuitesPassedResults():Promise<ITestSuiteResult[]> ;
    getAllTestSuitesResultsG(): Promise<ITestResult[]> 
    isAnyFailed():Promise<boolean>;
    execute():void;
}