import { TestResult } from "./TestResult";
import { IMatcher } from "../interfaces/IMatcher";
import { ITestResult } from "../interfaces/ITestResult";
import { TestPerformance } from "../Performance/Performance";
import { testTemplate } from "../TestTemplates/MatcherTemplate";
import { deepObjectEquals } from "./ComplicatedEqualers";
import { IBeforeAfterFunc } from "../interfaces/IBeforeAfterFunc";
import { IDescribable } from "../interfaces/IDescribable";

export class Matcher implements IMatcher, IBeforeAfterFunc, IDescribable {
  private m_StartAt: Date;
  private m_ErrorString: string;
  private m_Description: string;
  private m_Result: ITestResult;
  private m_Performance: TestPerformance;
  private m_BeforeFunctions: Function[];
  private m_AfterFunctions: Function[];

  constructor(
    private m_ExpectedValue: any,
    i_BeforeFunctions: Function[],
    i_AfterFunctions: Function[],
    i_Description: string
  ) {
    this.m_Performance = new TestPerformance();
    this.m_BeforeFunctions = i_BeforeFunctions;
    this.m_AfterFunctions = i_AfterFunctions;
    this.m_Description = i_Description;
  }

  get ExpectedValue(): any {
    return this.m_ExpectedValue;
  }

  set ExpectedValue(val: any) {
    this.m_ExpectedValue = val;
  }

  get Result(): ITestResult {
    return this.m_Result;
  }

  set Result(val: ITestResult) {
    this.m_Result = val;
  }

  get ErrorString(): string {
    return this.m_ErrorString;
  }

  set ErrorString(val: string) {
    this.m_ErrorString = val;
  }

  get Description(): string {
    return this.m_Description;
  }

  set Description(val: string) {
    this.m_Description = val;
  }

  get StartAt(): Date {
    return this.m_StartAt;
  }

  set StartAt(val: Date) {
    this.m_StartAt = val;
  }

  get Performance(): TestPerformance {
    return this.m_Performance;
  }

  set Performance(val: TestPerformance) {
    this.m_Performance = val;
  }

  get BeforeFunctions(): Function[] {
    return this.m_BeforeFunctions;
  }

  set BeforeFunctions(val: Function[]) {
    this.m_BeforeFunctions = val;
  }
  get AfterFunctions(): Function[] {
    return this.m_AfterFunctions;
  }

  set AfterFunctions(val: Function[]) {
    this.m_AfterFunctions = val;
  }

  public initMatcher(): void {
    this.m_BeforeFunctions.push(() => {
      this.m_Performance.startCount();
    });

    this.m_AfterFunctions.push(() => {
      //todo add it to the start of the array
      this.m_Performance.endCount();
    });
  }

  public before() {
    for (const func of this.m_BeforeFunctions) {
      func();
    }
  }

  public after() {
    for (const func of this.m_AfterFunctions) {
      func();
    }
  }

  public toBeTrue(): ITestResult {
    return testTemplate(
      this,
      () => {
        this.m_ExpectedValue === true;
      },
      "false"
    );
  }
  public toBeFalse(): ITestResult {
    return testTemplate(this, () => this.m_ExpectedValue === false, "true");
  }

  public toBeTruthy(): ITestResult {
    return testTemplate(
      this,
      () => {
        if (this.m_ExpectedValue) {
          return true;
        } else {
          return false;
        }
      },
      "falsy"
    );
  }

  public toBeFalsy(): ITestResult {
    return testTemplate(
      this,
      () => {
        if (this.m_ExpectedValue) {
          return false;
        } else {
          return true;
        }
      },
      "truthy"
    );
  }

  public equalValue(i_Param: any): ITestResult {
    return testTemplate(this, () => this.m_ExpectedValue === i_Param, i_Param);
  }

  public notEqualValue(i_Param: any): ITestResult {
    return testTemplate(this, () => this.m_ExpectedValue !== i_Param, i_Param);
  }

  public toBeLessThan(i_Param: number): ITestResult {
    return testTemplate(
      this,
      () => this.m_ExpectedValue < i_Param,
      i_Param.toString()
    );
  }

  public toBeLessThanOrEqual(i_Param: number): ITestResult {
    return testTemplate(
      this,
      () => this.m_ExpectedValue <= i_Param,
      i_Param.toString()
    );
  }

  public toBeGreaterThan(i_Param: number): ITestResult {
    return testTemplate(
      this,
      () => this.m_ExpectedValue > i_Param,
      i_Param.toString()
    );
  }

  public toBeGreaterThanOrEqual(i_Param: number): ITestResult {
    return testTemplate(
      this,
      () => this.m_ExpectedValue >= i_Param,
      i_Param.toString()
    );
  }

  public objectDeepEquals(i_obj: any): ITestResult {
    return testTemplate(
      this,
      () => deepObjectEquals(this.m_ExpectedValue, i_obj),
      i_obj
    );
  }
}
