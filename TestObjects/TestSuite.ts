import { ITestSuite } from "../interfaces/ITestSuite";
import { ITest } from "../interfaces/ITest";
import { Test } from "./Test";
import { ITestResult } from "../interfaces/ITestResult";
import { IDescribable } from "../interfaces/IDescribable";

export class TestSuite implements ITestSuite, IDescribable {
  
  private _beforeEach: Function[];
  private _afterEach: Function[];
  private _tests: ITest[];
  private _description: string;

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

  public addTest(testDescription: string): ITest {
    if (testDescription !== "") {
      const test = new Test(testDescription, this._beforeEach, this._afterEach);
      this._tests.push(test);
      return test;
    } else {
      throw new Error("test is null!");
    }
  }

  public getAllTestsResults(): ITestResult[] {
    const resultsArr = this._tests.map((test) => {
      return test.Matcher.Result;
    });

    return resultsArr;
  }

  public getPassedTestsResults(): ITestResult[]{
    const passedTests = this._tests.filter((test) => {
      return test.Matcher.Result.Passed;
    });

    const passedResults = [];
    for(const failedTest of passedTests){
      passedResults.push(failedTest.Matcher.Result);
    }

    return passedResults;
  }
  public getFailedTestsResults(): ITestResult[] {
    const failedTests = this._tests.filter((test) => {
      return !(test.Matcher.Result.Passed);
    });

    const failedResults = [];
    for(const failedTest of failedTests){
      failedResults.push(failedTest.Matcher.Result);
    }

    return failedResults;
  }

  public addBeforeEach(funcBefore: Function): ITestSuite {
    this._beforeEach.push(funcBefore);
    return this;
  }
  public addAfterEach(funcAfter: Function): ITestSuite {
    this._afterEach.push(funcAfter);
    return this;
  }



}
