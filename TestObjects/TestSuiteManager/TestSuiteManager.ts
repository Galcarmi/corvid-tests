import { ITestSuiteManager } from "../../interfaces/TestSuiteManager/ITestSuiteManager.js";
import { ISyncTestSuite } from "../../interfaces/TestSuite/ISyncTestSuite.js";
import { IAsyncTestSuite } from "../../interfaces/TestSuite/IAsyncTestSuite.js";
import { ITestSuiteResult } from "../../interfaces/TestSuiteManager/ITestSuiteResult.js";
import { AsyncTestSuite } from "../TestSuites/AsyncTestSuite.js";
import { TestSuite } from "../TestSuites/TestSuite.js";
import { TestSuiteResult } from "./TestSuiteResult.js";
import { ITestResult } from "../../interfaces/Tests/ITestResult.js";
import { executeTestsReader } from "../../TestsReader/testsReader.js"
import { busyManager, BusyManager } from "./BusyManager";
import { Lock } from "./Lock.js";

export class TestSuiteManager implements ITestSuiteManager {
  
  m_TestSuites: ISyncTestSuite[];
  m_AsyncTestSuites: IAsyncTestSuite[];
  m_BusyManager:BusyManager;

  constructor(){
      this.m_TestSuites = [];
      this.m_AsyncTestSuites = [];
      this.m_BusyManager = busyManager;
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
    ///todo handle lock
    const lock = new Lock();
    const ats = new AsyncTestSuite(i_TestSuiteDescription,lock);
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
      const tsResults = new TestSuiteResult(ts.Description);
      tsResults.TestsResults = testsResults;
      results.push(tsResults)
      // for (const testResult of testsResults) {
      //   results.push(new TestSuiteResult(ts.Description, testResult));
      // }
    }

    for (const ats of this.m_AsyncTestSuites) {
      const testsResults = await ats.getAllTestsResults();
      const tsResults = new TestSuiteResult(ats.Description);
      tsResults.TestsResults = testsResults;
      results.push(tsResults)
      // for (const testResult of testsResults) {
      //   results.push(new TestSuiteResult(ats.Description, testResult));
      // }
    }
    return results;
  }

  async getAllTestSuitesFailedResults(): Promise<ITestSuiteResult[]> {
    const results: ITestSuiteResult[] = [];
    for (const ts of this.m_TestSuites) {
      const testsResults = ts.getFailedTestsResults();
      const tsResults = new TestSuiteResult(ts.Description);
      tsResults.TestsResults = testsResults;
      results.push(tsResults)
      // for (const testResult of testsResults) {
      //   results.push(new TestSuiteResult(ts.Description, testResult));
      // }
    }

    for (const ats of this.m_AsyncTestSuites) {
      const testsResults = await ats.getFailedTestsResults();
      const tsResults = new TestSuiteResult(ats.Description);
      tsResults.TestsResults = testsResults;
      results.push(tsResults)
      // for (const testResult of testsResults) {
      //   results.push(new TestSuiteResult(ats.Description, testResult));
      // }
    }
    return results;
  }

  async getAllTestSuitesPassedResults(): Promise<ITestSuiteResult[]> {
    const results: ITestSuiteResult[] = [];
    for (const ts of this.m_TestSuites) {
      const testsResults = ts.getPassedTestsResults();
      const tsResults = new TestSuiteResult(ts.Description);
      tsResults.TestsResults = testsResults;
      results.push(tsResults)
      // for (const testResult of testsResults) {
      //   results.push(new TestSuiteResult(ts.Description, testResult));
      // }
    }

    for (const ats of this.m_AsyncTestSuites) {
      const testsResults = await ats.getPassedTestsResults();
      const tsResults = new TestSuiteResult(ats.Description);
      tsResults.TestsResults = testsResults;
      results.push(tsResults)
      // for (const testResult of testsResults) {
      //   results.push(new TestSuiteResult(ats.Description, testResult));
      // }
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

  async getAllTestSuitesResultsG(): Promise<ITestResult[]> {
    const results :ITestResult[]= []

    for (const ts of this.m_TestSuites) {
      const testsResults = ts.getAllTestsResults();
      for (const testResult of testsResults) {
        results.push(testResult);
      }
    }

    for (const ats of this.m_AsyncTestSuites) {
      const testsResults = await ats.getAllTestsResults();
      for (const testResult of testsResults) {
        results.push(testResult);
      }
    }
    return results;
  }

  execute(): void {
    executeTestsReader()
  }
}
