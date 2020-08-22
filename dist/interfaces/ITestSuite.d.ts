import { ITest } from "./ITest.js";
import { IDescribable } from "./IDescribable.js";
export interface ITestSuite extends IDescribable {
    Tests: ITest[];
    BeforeEach: Function[];
    AfterEach: Function[];
    addTest(i_test: string): ITest;
    addBeforeEach(i_funcBefore: Function): ITestSuite;
    addAfterEach(i_funcAfter: Function): ITestSuite;
    getAllTestsResults(): any;
    getPassedTestsResults(): any;
    getFailedTestsResults(): any;
}
