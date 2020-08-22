import { TestResult } from "../Tests/TestResult.js";
import { ITestSuiteResult } from "../../interfaces/TestSuiteManager/ITestSuiteResult.js";
import { ITestResult } from "../../interfaces/Tests/ITestResult.js";

export class TestSuiteResult extends TestResult implements ITestSuiteResult{
    m_TestSuiteDescription: string;

    constructor(i_TestSuiteDescription:string,i_TestResult:ITestResult){
        super(i_TestResult.Passed,i_TestResult.TimePassed,i_TestResult.Description,i_TestResult.FailedString,i_TestResult.StartAt,i_TestResult.ErrorDetected,i_TestResult.ErrorString)
    }

      get TestSuiteDescription(): string {
        return this.m_TestSuiteDescription;
      }
    
      set TestSuiteDescription(val: string) {
        this.m_TestSuiteDescription = val;
      }
}