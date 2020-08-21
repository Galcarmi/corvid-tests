import { IAsyncMatcher } from "../interfaces/IAsyncMatcher.js";
import { ITestResult } from "../interfaces/ITestResult.js";
import { TestPerformance } from "../Performance/Performance.js";
import { AsyncTestTemplate } from "../TestTemplates/AsyncMatcherTemplate.js";
import { deepObjectEqualsEqualer } from "./ComplicatedEqualers.js";
import { IMatcher } from "../interfaces/IMatcher.js";
import { Matcher } from "./Matcher.js";
import { TestResult } from "./TestResult.js";

export class AsyncMatcherProxy implements IAsyncMatcher {
 
  private m_Matcher: IMatcher;
  private m_TestResultStatus: Promise<TestResult>;
  private m_TestResultResolver: Function;

  constructor(
    private m_ExpectedPromiseValue: Promise<any>,
    i_BeforeFunctions: Function[],
    i_AfterFunctions: Function[],
    i_Description: string
  ) {
    this.m_Matcher = new Matcher(
      null,
      i_BeforeFunctions,
      i_AfterFunctions,
      i_Description
    );
    this.m_TestResultStatus = new Promise((res, rej) => {
      this.m_TestResultResolver = res;
    });
  }

  get TestResultStatus(): Promise<any> {
    return this.m_TestResultStatus;
  }

  set TestResultStatus(val: Promise<any>) {
    this.m_TestResultStatus = val;
  }

  get ExpectedValue(): Promise<any> {
    return this.Matcher.ExpectedValue;
  }

  set ExpectedValue(val: Promise<any>) {
    this.Matcher.ExpectedValue = val;
  }

  get Result(): ITestResult {
    return this.Matcher.Result;
  }

  set Result(val: ITestResult) {
    this.Matcher.Result = val;
  }

  get ErrorString(): string {
    return this.Matcher.ErrorString;
  }

  set ErrorString(val: string) {
    this.Matcher.ErrorString = val;
  }

  get Description(): string {
    return this.Matcher.Description;
  }

  set Description(val: string) {
    this.Matcher.Description = val;
  }

  get StartAt(): Date {
    return this.Matcher.StartAt;
  }

  set StartAt(val: Date) {
    this.Matcher.StartAt = val;
  }

  get Performance(): TestPerformance {
    return this.Matcher.Performance;
  }

  set Performance(val: TestPerformance) {
    this.Matcher.Performance = val;
  }

  get BeforeFunctions(): Function[] {
    return this.Matcher.BeforeFunctions;
  }

  set BeforeFunctions(val: Function[]) {
    this.Matcher.BeforeFunctions = val;
  }
  get AfterFunctions(): Function[] {
    return this.Matcher.AfterFunctions;
  }

  set AfterFunctions(val: Function[]) {
    this.Matcher.AfterFunctions = val;
  }

  ///todo check why it has to be type of any
  get Matcher(): any {
    return this.m_Matcher;
  }

  set Matcher(val: any) {
    this.m_Matcher = val;
  }

  public resolveTestResult(i_TestResult: TestResult): void {
    this.m_TestResultResolver(i_TestResult);
  }

  public initMatcher(): void {
    this.Matcher.BeforeFunctions.unshift(() => {
      this.Matcher.Performance.startCount();
    });

    this.Matcher.AfterFunctions.push(() => {
      this.Matcher.Performance.endCount();
    });
  }

  public async before() {
    for (const func of this.Matcher.BeforeFunctions) {
      await func();
    }
  }

  public async after() {
    for (const func of this.Matcher.AfterFunctions) {
      await func();
    }
  }

  public async toBeTrue(): Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(
      this,
      () => {
        this.Matcher.ExpectedValue === true;
      },
      "false"
    );
  }
  public async toBeFalse(): Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(
      this,
      () => this.Matcher.ExpectedValue === false,
      "true"
    );
  }

  public async toBeTruthy(): Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(
      this,
      () => {
        if (this.Matcher.ExpectedValue) {
          return true;
        } else {
          return false;
        }
      },
      "falsy"
    );
  }

  public async toBeFalsy(): Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(
      this,
      () => {
        if (this.Matcher.ExpectedValue) {
          return false;
        } else {
          return true;
        }
      },
      "truthy"
    );
  }

  public async toBe(i_Param: any): Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(
      this,
      () => this.Matcher.ExpectedValue === i_Param,
      i_Param
    );
  }

  public async notToBe(i_Param: any): Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(
      this,
      () => this.Matcher.ExpectedValue !== i_Param,
      i_Param
    );
  }

  public async toBeLessThan(i_Param: number): Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(
      this,
      () => this.Matcher.ExpectedValue < i_Param,
      i_Param.toString()
    );
  }

  public async toBeLessThanOrEqual(i_Param: number): Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(
      this,
      () => this.Matcher.ExpectedValue <= i_Param,
      i_Param.toString()
    );
  }

  public async toBeGreaterThan(i_Param: number): Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(
      this,
      () => this.Matcher.ExpectedValue > i_Param,
      i_Param.toString()
    );
  }

  public async toBeGreaterThanOrEqual(i_Param: number): Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(
      this,
      () => this.Matcher.ExpectedValue >= i_Param,
      i_Param.toString()
    );
  }

  public async deepObjectEquals(i_Obj: any): Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(
      this,
      () => deepObjectEqualsEqualer(this.Matcher.ExpectedValue, i_Obj),
      i_Obj
    );
  }

  public async toContain(i_param: any): Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(
      this,
      ()=>{
        const result = this.Matcher.ExpectedValue.filter((value: any) => value === i_param)
        return result?true:false;
      },
      i_param
    )
  }
  
  public async toContainEqual(i_param: any): Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(
      this,
      ()=>{
        const result = this.Matcher.ExpectedValue.filter((value: any) => deepObjectEqualsEqualer(value , i_param))
        return result?true:false;
      },
      i_param
    );
  }

  public async prepareMatcher(): Promise<void> {
    let expectedValue = await this.m_ExpectedPromiseValue;
    this.Matcher.ExpectedValue = expectedValue;
  }
}
