import { ITestSuiteManager } from "../../interfaces/TestSuiteManager/ITestSuiteManager.js";
import { ISyncTestSuite } from "../../interfaces/TestSuite/ISyncTestSuite.js";
import { IAsyncTestSuite } from "../../interfaces/TestSuite/IAsyncTestSuite.js";
import { ITestSuiteResult } from "../../interfaces/TestSuiteManager/ITestSuiteResult.js";
import { AsyncTestSuite } from "../TestSuites/AsyncTestSuite.js";
import { TestSuite } from "../TestSuites/TestSuite.js";
import { TestSuiteResult } from "./TestSuiteResult.js";

export class TestSuiteManager implements ITestSuiteManager {
  m_TestSuites: ISyncTestSuite[];
  m_AsyncTestSuites: IAsyncTestSuite[];

  constructor(){
      this.m_TestSuites = [];
      this.m_AsyncTestSuites = [];
  }

  get TestSuites(): ISyncTestSuite[] {
    return this.m_TestSuites;
  }

  set TestSuites(val: ISyncTestSuite[]) {
    this.m_TestSuites = val;
  }

  get IAsyncTestSuite(): IAsyncTestSuite[] {
    return this.m_AsyncTestSuites;
  }

  set AsyncTestSuites(val: IAsyncTestSuite[]) {
    this.m_AsyncTestSuites = val;
  }

  addAsyncTestSuite(i_TestSuiteDescription: string): IAsyncTestSuite {
    const ats = new AsyncTestSuite(i_TestSuiteDescription);
    this.m_AsyncTestSuites.push(ats);
    return ats;
  }
  addTestSuite(i_TestSuiteDescription: string): ISyncTestSuite {
    const ts = new TestSuite(i_TestSuiteDescription);
    this.m_TestSuites.push(ts);
    return ts;
  }

  async getAllTestSuitesResults(): Promise<ITestSuiteResult[]> {
    const results: ITestSuiteResult[] = [];
    for (const ts of this.m_TestSuites) {
      const testsResults = ts.getAllTestsResults();
      for (const testResult of testsResults) {
        results.push(new TestSuiteResult(ts.Description, testResult));
      }
    }

    for (const ats of this.m_AsyncTestSuites) {
      const testsResults = await ats.getAllTestsResults();
      for (const testResult of testsResults) {
        results.push(new TestSuiteResult(ats.Description, testResult));
      }
    }
    return results;
  }

  async getAllTestSuitesFailedResults(): Promise<ITestSuiteResult[]> {
    const results: ITestSuiteResult[] = [];
    for (const ts of this.m_TestSuites) {
      const testsResults = ts.getFailedTestsResults();
      for (const testResult of testsResults) {
        results.push(new TestSuiteResult(ts.Description, testResult));
      }
    }

    for (const ats of this.m_AsyncTestSuites) {
      const testsResults = await ats.getFailedTestsResults();
      for (const testResult of testsResults) {
        results.push(new TestSuiteResult(ats.Description, testResult));
      }
    }
    return results;
  }

  async getAllTestSuitesPassedResults(): Promise<ITestSuiteResult[]> {
    const results: ITestSuiteResult[] = [];
    for (const ts of this.m_TestSuites) {
      const testsResults = ts.getPassedTestsResults();
      for (const testResult of testsResults) {
        results.push(new TestSuiteResult(ts.Description, testResult));
      }
    }

    for (const ats of this.m_AsyncTestSuites) {
      const testsResults = await ats.getPassedTestsResults();
      for (const testResult of testsResults) {
        results.push(new TestSuiteResult(ats.Description, testResult));
      }
    }
    return results;
  }

  async isAnyFailed(): Promise<boolean> {
    let flag = false;
    for (const ts of this.m_TestSuites) {
      const failed = ts.getFailedTestsResults();
      if (failed) {
        flag = true;
      }
    }

    for (const ats of this.m_AsyncTestSuites) {
      const failed = await ats.getFailedTestsResults();
      if (failed) {
        flag = true;
      }
    }

    return flag;
  }
}
