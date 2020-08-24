import { ITest } from "../Tests/ITest.js";
import { IDescribable } from "../Utils/IDescribable.js";

export interface ITestSuite extends IDescribable {
  // //private fields
  // _tests : ITest[]
  // _description:string;
  // _beforeEach: Function[];
  // _afterEach: Function[];

  //access modifiers
  Tests: ITest[];
  BeforeEach: Function[];
  AfterEach: Function[];

  addBeforeEach(i_funcBefore: Function): ITestSuite;
  addAfterEach(i_funcAfter: Function): ITestSuite;

  getResults(): any;
  getPassed(): any;
  getFailed(): any;
}
