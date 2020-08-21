import { ITest } from "./ITest.js";
import { IDescribable } from "./IDescribable.js";

export interface ITestSuite extends IDescribable{
  // //private fields
  // _tests : ITest[]
  // _description:string;
  // _beforeEach: Function[];
  // _afterEach: Function[];

  //access modifiers
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
