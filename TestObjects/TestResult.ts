import { ITestResult } from "../interfaces/ITestResult.js";
import { IDescribable } from "../interfaces/IDescribable.js";

export class TestResult implements ITestResult, IDescribable {
  private m_Description: string;
  private m_Passed: boolean;
  private m_TimePassed: number;
  private m_ErrorString: string;
  private m_StartAt: Date;

  constructor(
    passed: boolean,
    timePassed: number,
    description: string,
    errorString: string | null,
    startAt: Date
  ) {
    this.m_StartAt = startAt;
    this.m_Passed = passed;
    this.m_TimePassed = timePassed;
    this.m_Description = description;
    if (errorString !== null) {
      this.m_ErrorString = errorString;
    }
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

  get ErrorString(): string {
    return this.m_ErrorString;
  }

  set ErrorString(val: string) {
    this.m_ErrorString = val;
  }
}
