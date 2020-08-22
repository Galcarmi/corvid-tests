import { ISyncTestSuite } from "../TestSuite/ISyncTestSuite.js";
import { IAsyncTestSuite } from "../TestSuite/IAsyncTestSuite.js";
import { AsyncTestSuite } from "../../TestObjects/TestSuites/AsyncTestSuite.js";
import { ITestSuiteResult } from "./ITestSuiteResult.js";

export interface ITestSuiteManager{
    TestSuites:ISyncTestSuite[];
    AsyncTestSuites:IAsyncTestSuite[];

    addAsyncTestSuite(i_testSuiteName:string):AsyncTestSuite;
    addTestSuite(i_testSuiteName:string):ISyncTestSuite;
    getAllTestSuitesResults():ITestSuiteResult[];
    getAllTestSuitesFailedResults():ITestSuiteResult[];
    getAllTestSuitesPassedResults():ITestSuiteResult[];
    isAnyFailed():boolean;
}