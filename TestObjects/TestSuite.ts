import { ITestSuite } from "../interfaces/ITestSuite";
import { ITest } from "../interfaces/ITest";
import { Test } from "./Test";
import { ITestResult } from "../interfaces/ITestResult";

export class TestSuite implements ITestSuite {
  
  _beforeEach: Function[];
  _afterEach: Function[];
  _tests: ITest[];
  _description: string;

  constructor(description: string) {
    this._tests = [];
    this._description = description;
    this._beforeEach = [];
    this._afterEach = [];
  }

  get Description(): string {
    return this._description;
  }

  set Description(val:string){
    this._description = val;
  }

  get Tests(): ITest[] {
    return this._tests;
  }

  set Tests(val:ITest[]){
    this._tests = val;
  }

  get BeforeEach(): Function[] {
    return this._beforeEach;
  }

  set BeforeEach(val:Function[]){
    this._beforeEach = val;
  }

  get AfterEach(): Function[] {
    return this._afterEach;
  }

  set AfterEach(val:Function[]){
    this._afterEach = val;
  }

  addTest(testDescription: string): ITest {
    if (testDescription !== "") {
      const test = new Test(testDescription, this._beforeEach, this._afterEach);
      this._tests.push(test);
      return test;
    } else {
      throw new Error("test is null!");
    }
  }
  run(): void {
    throw new Error("Method not implemented.");
  }

  getResults(): ITestResult[] {
    const resultsArr = this._tests.map((test) => {
      return test.Matcher.Result;
    });

    return resultsArr;
  }

  addBeforeEach(funcBefore: Function): ITestSuite {
    this._beforeEach.push(funcBefore);
    return this;
  }
  addAfterEach(funcAfter: Function): ITestSuite {
    this._afterEach.push(funcAfter);
    return this;
  }

}
