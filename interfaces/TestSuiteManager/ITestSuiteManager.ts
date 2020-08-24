import { IAsyncTestSuite } from "../TestSuite/IAsyncTestSuite.js";
import { ITestSuiteResult } from "./ITestSuiteResult.js";
import { ITestResult } from "../Tests/ITestResult.js";

export interface ITestSuiteManager{
    AsyncTestSuites:IAsyncTestSuite[];

    describe(i_testSuiteName:string):IAsyncTestSuite;
    getResults():Promise<ITestSuiteResult[]> ;
    getFailed():Promise<ITestSuiteResult[]> ;
    getPassed():Promise<ITestSuiteResult[]> ;
    getResultsG(): Promise<ITestResult[]> 
    isAnyFailed():Promise<boolean>;
    execute():void;

}