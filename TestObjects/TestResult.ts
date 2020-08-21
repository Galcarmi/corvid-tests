import { ITestResult } from "../interfaces/ITestResult.js";

export class TestResult implements ITestResult {
  
  private m_Description: string;
  private m_Passed: boolean;
  private m_TimePassed: number;
  private m_ErrorString: string|null;
  private m_StartAt: Date;
  private m_FailedString:string|null;
  private m_ErrorDetected:boolean;

  constructor(
    passed: boolean,
    timePassed: number,
    description: string,
    failedString: string|null,
    startAt: Date,
    errorDetected:boolean,
    errorString:string|null
  ) {
    this.m_StartAt = startAt;
    this.m_Passed = passed;
    this.m_TimePassed = timePassed;
    this.m_Description = description;
    if (failedString !== null) {
      this.m_FailedString = failedString;
    }
    if(errorDetected){
      this.m_ErrorDetected = true;
      this.m_ErrorString = errorString;
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
