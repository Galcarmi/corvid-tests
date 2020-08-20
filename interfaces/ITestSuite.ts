import { ITest } from "./ITest";
import { ITestResult } from "./ITestResult";

export interface ITestSuite{

    // //private fields
    // _tests : ITest[]
    // _description:string;
    // _beforeEach: Function[];
    // _afterEach: Function[];

    //access modifiers
    Tests : ITest[]
    BeforeEach: Function[];
    AfterEach: Function[];

    addTest(test:string): ITest;
    addBeforeEach(funcBefore:Function):ITestSuite;
    addAfterEach(funcAfter:Function):ITestSuite;

    getAllTestsResults():any;
    getPassedTestsResults():any;
    getFailedTestsResults():any;

}