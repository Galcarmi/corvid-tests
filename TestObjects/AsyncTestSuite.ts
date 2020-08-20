import { ITestSuite } from "../interfaces/ITestSuite";
import { ITest } from "../interfaces/ITest";
import { ITestResult } from "../interfaces/ITestResult";
import {AsyncFunction} from '../types/AsyncFunction'
import { IDescribable } from "../interfaces/IDescribable";
import {AsyncTest} from './AsyncTest'
import { IAsyncTest } from "../interfaces/IAsyncTest";
import { TestResult } from "./TestResult";

export class AsyncTestSuite implements ITestSuite, IDescribable {
  
  private _beforeEach: (Function|AsyncFunction)[];
  private _afterEach: (Function|AsyncFunction)[];
  private _tests: AsyncTest[];
  private _allTestsResolved:boolean;
  private _results:TestResult[];
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

  get Tests(): AsyncTest[] {
    return this._tests;
  }

  set Tests(val:AsyncTest[]){
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

  public addTest(testDescription: string): IAsyncTest {
    if (testDescription !== "") {
      const test = new AsyncTest(testDescription, this._beforeEach, this._afterEach);
      this._tests.push(test);
      return test;
    } else {
      throw new Error("test is null!");
    }
  }

  public async getAllTestsResults(): Promise<ITestResult[]> {
    await this.waitForTestsToBeResolved();
    
    return this._results;
  }

  public async getPassedTestsResults(): Promise<TestResult[]>{
    await this.waitForTestsToBeResolved();

    const passedTests = this._results.filter((result)=>{
        return result.Passed;
    })

    return passedTests;
  }

  public async getFailedTestsResults(): Promise<ITestResult[]> {
    await this.waitForTestsToBeResolved();

    const failedTests = this._results.filter((result)=>{
        return !result.Passed;
    })

    return failedTests;
  }

  private async waitForTestsToBeResolved():Promise<void>{
    if(!this._allTestsResolved){
        const testResultsStatus = this._tests.map((test)=>{
            return test.Matcher.TestResultStatus;
        })
    
        const results = await Promise.all(testResultsStatus);
    
        this._results = results;
        this._allTestsResolved = true;
    }
  }

  public addBeforeEach(funcBefore: (Function|AsyncFunction)): ITestSuite {
    this._beforeEach.push(funcBefore);
    return this;
  }
  public addAfterEach(funcAfter: (Function|AsyncFunction)): ITestSuite {
    this._afterEach.push(funcAfter);
    return this;
  }



}
