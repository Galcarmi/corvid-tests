import { ITestSuite } from "./ITestSuite.js";
import { ISyncTest } from "./ISyncTest.js";
import { ITestResult } from "./ITestResult.js";
export interface ISyncTestSuite extends ITestSuite {
    Tests: ISyncTest[];
    BeforeEach: Function[];
    AfterEach: Function[];
    addTest(i_test: string): ISyncTest;
    addBeforeEach(i_funcBefore: Function): ITestSuite;
    addAfterEach(i_funcAfter: Function): ITestSuite;
    getAllTestsResults(): ITestResult[];
    getPassedTestsResults(): ITestResult[];
    getFailedTestsResults(): ITestResult[];
}
