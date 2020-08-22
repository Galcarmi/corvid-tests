import { ITestResult } from "../../interfaces/Tests/ITestResult.js";
import { AsyncFunction } from "../../types/AsyncFunction.js";
import { AsyncTest } from "../Tests/AsyncTest.js";
import { IAsyncTest } from "../../interfaces/Tests/IAsyncTest.js";
import { TestResult } from "../Tests/TestResult.js";
import { IAsyncTestSuite } from "../../interfaces/TestSuite/IAsyncTestSuite.js";

export class AsyncTestSuite implements IAsyncTestSuite {
  private m_BeforeEach: (Function | AsyncFunction)[];
  private m_AfterEach: (Function | AsyncFunction)[];
  private m_Tests: AsyncTest[];
  private m_AllTestsResolved: boolean;
  private m_Results: TestResult[];
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

  get Tests(): AsyncTest[] {
    return this.m_Tests;
  }

  set Tests(val: AsyncTest[]) {
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

  public addTest(i_testDescription: string): IAsyncTest {
    if (i_testDescription !== "") {
      const test = new AsyncTest(
        i_testDescription,
        this.m_BeforeEach,
        this.m_AfterEach
      );
      this.m_Tests.push(test);
      return test;
    } else {
      throw new Error("test is null!");
    }
  }

  public async getAllTestsResults(): Promise<ITestResult[]> {
    await this.waitForTestsToBeResolved();

    return this.m_Results;
  }

  public async getPassedTestsResults(): Promise<TestResult[]> {
    await this.waitForTestsToBeResolved();

    const passedTests = this.m_Results.filter((result) => {
      return result.Passed;
    });

    return passedTests;
  }

  public async getFailedTestsResults(): Promise<ITestResult[]> {
    await this.waitForTestsToBeResolved();

    const failedTests = this.m_Results.filter((result) => {
      return !result.Passed;
    });

    return failedTests;
  }

  private async waitForTestsToBeResolved(): Promise<void> {
    if (!this.m_AllTestsResolved) {
      const testResultsStatus = this.m_Tests.map((test) => {
        return test.Matcher.TestResultStatus;
      });

      const results = await Promise.all(testResultsStatus);

      this.m_Results = results;
      this.m_AllTestsResolved = true;
    }
  }

  public addBeforeEach(i_FuncBefore: Function | AsyncFunction): IAsyncTestSuite {
    this.m_BeforeEach.push(i_FuncBefore);
    return this;
  }
  public addAfterEach(i_FuncAfter: Function | AsyncFunction): IAsyncTestSuite {
    this.m_AfterEach.push(i_FuncAfter);
    return this;
  }
}
