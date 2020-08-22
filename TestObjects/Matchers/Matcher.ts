import { IMatcher } from "../../interfaces/Matchers/IMatcher.js";
import { ITestResult } from "../../interfaces/Tests/ITestResult.js";
import { TestPerformance } from "../../Performance/Performance.js";
import { deepObjectEqualsEqualer } from "../Utils/ComplicatedEqualers.js";
import {errorTemplate} from "../../Utils/TemplateStrings.js"
import { TestResult } from "../Tests/TestResult.js";


export class Matcher implements IMatcher {
  
  private m_StartAt: Date;
  private m_FailedString: string;
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

  get FailedString(): string {
    return this.m_FailedString;
  }

  set FailedString(val: string) {
    this.m_FailedString = val;
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
    return this.testTemplate(
      () => {
        this.m_ExpectedValue === true;
      },
      "false"
    );
  }
  public toBeFalse(): ITestResult {
    return this.testTemplate(() => this.m_ExpectedValue === false, "true");
  }

  public toBeTruthy(): ITestResult {
    return this.testTemplate(
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
    return this.testTemplate(
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

  public toBe(i_Param: any): ITestResult {
    return this.testTemplate(() => this.m_ExpectedValue === i_Param, i_Param);
  }

  public notToBe(i_Param: any): ITestResult {
    return this.testTemplate(() => this.m_ExpectedValue !== i_Param, i_Param);
  }

  public toBeLessThan(i_Param: number): ITestResult {
    return this.testTemplate(
      () => this.m_ExpectedValue < i_Param,
      i_Param.toString()
    );
  }

  public toBeLessThanOrEqual(i_Param: number): ITestResult {
    return this.testTemplate(
      () => this.m_ExpectedValue <= i_Param,
      i_Param.toString()
    );
  }

  public toBeGreaterThan(i_Param: number): ITestResult {
    return this.testTemplate(
      () => this.m_ExpectedValue > i_Param,
      i_Param.toString()
    );
  }

  public toBeGreaterThanOrEqual(i_Param: number): ITestResult {
    return this.testTemplate(
      () => this.m_ExpectedValue >= i_Param,
      i_Param.toString()
    );
  }

  public deepObjectEquals(i_obj: any): ITestResult {
    return this.testTemplate(
      () => deepObjectEqualsEqualer(this.m_ExpectedValue, i_obj),
      i_obj
    );
  }

  public toContain(i_param: any): ITestResult {
    return this.testTemplate(
      ()=>{
        const result = this.m_ExpectedValue.filter((value: any) => value === i_param)
        return result?true:false;
      },
      i_param
    )
  }

  public toContainEqual(i_param: any): ITestResult {
    return this.testTemplate(
      ()=>{
        const result = this.m_ExpectedValue.filter((value: any) => deepObjectEqualsEqualer(value , i_param))
        return result?true:false;
      },
      i_param
    );
  }

  private testTemplate(actualTest:Function, errorValue:any):ITestResult{
    this.StartAt = new Date();
    this.initMatcher();
    this.before();
    const thisResult = actualTest();
    this.after();

    const errorString = thisResult?null:errorTemplate(JSON.stringify(this.ExpectedValue),JSON.stringify(errorValue));
    this.Result = new TestResult(thisResult, this.Performance.getCountMS(), this.Description, errorString, this.StartAt,false,null);
    return this.Result;
}
}
