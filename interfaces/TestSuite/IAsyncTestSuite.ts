import { ITestSuite } from "./ITestSuite.js";
import { IAsyncTest } from "../Tests/IAsyncTest.js";
import { ITestResult } from "../Tests/ITestResult.js";

export interface IAsyncTestSuite extends ITestSuite{
    Tests: IAsyncTest[];
    BeforeEach: Function[];
    AfterEach: Function[];
  
    waitForTestsToBeResolved(): Promise<void>
    it(i_test: string): IAsyncTest;
    addBeforeEach(i_funcBefore: Function): IAsyncTestSuite;
    addAfterEach(i_funcAfter: Function): IAsyncTestSuite;
  
    getResults(): Promise<ITestResult[]>;
    getPassed(): Promise<ITestResult[]>;
    getFailed(): Promise<ITestResult[]>;
}