import { ITestResult } from "../../interfaces/Tests/ITestResult.js";

export class TestResult implements ITestResult {
  
  private m_Description: string;
  private m_Passed: boolean;
  private m_TimePassed: number;
  private m_ErrorString: string|null;
  private m_StartAt: Date;
  private m_FailedString:string|null;
  private m_ErrorDetected:boolean;

  constructor(
    i_Passed: boolean,
    i_TimePassed: number,
    i_Description: string,
    i_FailedString: string|null,
    i_StartAt: Date,
    i_ErrorDetected:boolean,
    i_ErrorString:string|null
  ) {
    this.m_StartAt = i_StartAt;
    this.m_Passed = i_Passed;
    this.m_TimePassed = i_TimePassed;
    this.m_Description = i_Description;
    if (i_FailedString !== null) {
      this.m_FailedString = i_FailedString;
    }
    if(i_ErrorDetected){
      this.m_ErrorDetected = true;
      this.m_ErrorString = i_ErrorString;
    }
  }

  get FailedString(): string|null {
    return this.m_FailedString;
  }

  set FailedString(val: string|null) {
    this.m_FailedString = val;
  }

  get ErrorDetected(): boolean {
    return this.m_ErrorDetected;
  }

  set ErrorDetected(val: boolean) {
    this.m_ErrorDetected = val;
  }

  get StartAt(): Date {
    return this.m_StartAt;
  }

  set StartAt(val: Date) {
    this.m_StartAt = val;
  }

  get Passed(): boolean {
    return this.m_Passed;
  }

  set Passed(val: boolean) {
    this.m_Passed = val;
  }

  get TimePassed(): number {
    return this.m_TimePassed;
  }

  set TimePassed(val: number) {
    this.m_TimePassed = val;
  }

  get Description(): string {
    return this.m_Description;
  }

  set Description(val: string) {
    this.m_Description = val;
  }

  get ErrorString(): string|null {
    return this.m_ErrorString;
  }

  set ErrorString(val: string|null) {
    this.m_ErrorString = val;
  }
}
