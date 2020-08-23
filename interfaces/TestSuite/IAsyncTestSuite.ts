import { ITestSuite } from "./ITestSuite.js";
import { IAsyncTest } from "../Tests/IAsyncTest.js";
import { ITestResult } from "../Tests/ITestResult.js";

export interface IAsyncTestSuite extends ITestSuite{
    Tests: IAsyncTest[];
    BeforeEach: Function[];
    AfterEach: Function[];
  
    waitForTestsToBeResolved(): Promise<void>
    addTest(i_test: string): IAsyncTest;
    addBeforeEach(i_funcBefore: Function): IAsyncTestSuite;
    addAfterEach(i_funcAfter: Function): IAsyncTestSuite;
  
    getAllTestsResults(): Promise<ITestResult[]>;
    getPassedTestsResults(): Promise<ITestResult[]>;
    getFailedTestsResults(): Promise<ITestResult[]>;
}