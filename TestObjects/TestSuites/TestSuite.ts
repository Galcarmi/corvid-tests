import { Test } from "../Tests/Test.js";
import { ITestResult } from "../../interfaces/Tests/ITestResult.js";
import { ISyncTestSuite } from "../../interfaces/TestSuite/ISyncTestSuite.js";
import { ISyncTest } from "../../interfaces/Tests/ISyncTest.js";

export class TestSuite implements ISyncTestSuite {
  private m_BeforeEach: Function[];
  private m_AfterEach: Function[];
  private m_Tests: ISyncTest[];
  private m_Description: string;

  constructor(i_Description: string) {
    this.m_Tests = [];
    this.m_Description = i_Description;
    this.m_BeforeEach = [];
    this.m_AfterEach = [];
  }

  get Description(): string {
    return this.m_Description;
  }

  set Description(val: string) {
    this.m_Description = val;
  }

  get Tests(): ISyncTest[] {
    return this.m_Tests;
  }

  set Tests(val: ISyncTest[]) {
    this.m_Tests = val;
  }

  get BeforeEach(): Function[] {
    return this.m_BeforeEach;
  }

  set BeforeEach(val: Function[]) {
    this.m_BeforeEach = val;
  }

  get AfterEach(): Function[] {
    return this.m_AfterEach;
  }

  set AfterEach(val: Function[]) {
    this.m_AfterEach = val;
  }

  public addTest(i_TestDescription: string): ISyncTest {
    if (i_TestDescription !== "") {
      const test = new Test(
        i_TestDescription,
        this.m_BeforeEach,
        this.m_AfterEach
      );
      this.m_Tests.push(test);
      return test;
    } else {
      throw new Error("test is null!");
    }
  }

  public getAllTestsResults(): ITestResult[] {
    const resultsArr = this.m_Tests.map((test) => {
      return test.Matcher.Result;
    });

    return resultsArr;
  }

  public getPassedTestsResults(): ITestResult[] {
    const passedTests = this.m_Tests.filter((test) => {
      return test.Matcher.Result.Passed;
    });

    const passedResults = [];
    for (const failedTest of passedTests) {
      passedResults.push(failedTest.Matcher.Result);
    }

    return passedResults;
  }
  public getFailedTestsResults(): ITestResult[] {
    const failedTests = this.m_Tests.filter((test) => {
      return !test.Matcher.Result.Passed;
    });

    const failedResults = [];
    for (const failedTest of failedTests) {
      failedResults.push(failedTest.Matcher.Result);
    }

    return failedResults;
  }

  public addBeforeEach(i_FuncBefore: Function): ISyncTestSuite {
    this.m_BeforeEach.push(i_FuncBefore);
    return this;
  }
  public addAfterEach(i_FuncAfter: Function): ISyncTestSuite {
    this.m_AfterEach.push(i_FuncAfter);
    return this;
  }
}
