import { ITestSuiteManager } from "../../interfaces/TestSuiteManager/ITestSuiteManager.js";
import { IAsyncTestSuite } from "../../interfaces/TestSuite/IAsyncTestSuite.js";
import { ITestSuiteResult } from "../../interfaces/TestSuiteManager/ITestSuiteResult.js";
import { AsyncTestSuite } from "../TestSuites/AsyncTestSuite.js";
import { TestSuiteResult } from "./TestSuiteResult.js";
import { ITestResult } from "../../interfaces/Tests/ITestResult.js";
import { executeTestsReader } from "../../TestsReader/testsReader.js"


export class TestSuiteManager implements ITestSuiteManager {
  
  m_AsyncTestSuites: IAsyncTestSuite[];

  constructor(){
      this.m_AsyncTestSuites = [];
  }



  get IAsyncTestSuite(): IAsyncTestSuite[] {
    return this.m_AsyncTestSuites;
  }

  set AsyncTestSuites(val: IAsyncTestSuite[]) {
    this.m_AsyncTestSuites = val;
  }

  public describe(i_TestSuiteDescription: string): IAsyncTestSuite {
    const ats = new AsyncTestSuite(i_TestSuiteDescription);
    this.m_AsyncTestSuites.push(ats);
    return ats;
  }

  async getResults(): Promise<ITestSuiteResult[]> {
    const results: ITestSuiteResult[] = [];
    
    for (const ats of this.m_AsyncTestSuites) {
      const testsResults = await ats.getResults();
      const tsResults = new TestSuiteResult(ats.Description);
      tsResults.TestsResults = testsResults;
      results.push(tsResults)
    }
    return results;
  }

  async getFailed(): Promise<ITestSuiteResult[]> {
    const results: ITestSuiteResult[] = [];

    for (const ats of this.m_AsyncTestSuites) {
      const testsResults = await ats.getFailed();
      const tsResults = new TestSuiteResult(ats.Description);
      tsResults.TestsResults = testsResults;
      results.push(tsResults)
    }
    return results;
  }

  async getPassed(): Promise<ITestSuiteResult[]> {
    const results: ITestSuiteResult[] = [];

    for (const ats of this.m_AsyncTestSuites) {
      const testsResults = await ats.getPassed();
      const tsResults = new TestSuiteResult(ats.Description);
      tsResults.TestsResults = testsResults;
      results.push(tsResults)
    }
    return results;
  }

  async isAnyFailed(): Promise<boolean> {
    let flag = false;

    for (const ats of this.m_AsyncTestSuites) {
      const failed = await ats.getFailed();
      if (failed) {
        flag = true;
        break;
      }
    }

    return flag;
  }

  async getResultsG(): Promise<ITestResult[]> {
    const results :ITestResult[]= []

    for (const ats of this.m_AsyncTestSuites) {
      const testsResults = await ats.getResults();
      for (const testResult of testsResults) {
        results.push(testResult);
      }
    }
    return results;
  }

  public async waitForAsyncTestsToBeResolved():Promise<any>{
    for(const ats of this.m_AsyncTestSuites){
      await ats.waitForTestsToBeResolved()
    }
  }

  async execute(i_FolderPath:string): Promise<void> {
    await executeTestsReader(i_FolderPath)
  }
}
