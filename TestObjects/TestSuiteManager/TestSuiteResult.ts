import { ITestSuiteResult } from "../../interfaces/TestSuiteManager/ITestSuiteResult.js";
import { ITestResult } from "../../interfaces/Tests/ITestResult.js";

export class TestSuiteResult implements ITestSuiteResult{
    m_TestSuiteDescription: string;
    m_TestsResults: ITestResult[];

    constructor(i_TestSuiteDescription:string){
      this.m_TestSuiteDescription = i_TestSuiteDescription;
    }

      get TestSuiteDescription(): string {
        return this.m_TestSuiteDescription;
      }
    
      set TestSuiteDescription(val: string) {
        this.m_TestSuiteDescription = val;
      }

      get TestsResults(): ITestResult[] {
        return this.m_TestsResults;
      }
    
      set TestsResults(val: ITestResult[]) {
        this.m_TestsResults = val;
      }
}