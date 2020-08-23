import { IAsyncMatcher } from "../../interfaces/Matchers/IAsyncMatcher.js";
import { ITestResult } from "../../interfaces/Tests/ITestResult.js";
import { TestPerformance } from "../../Performance/Performance.js";
import { deepObjectEqualsEqualer } from "../Utils/ComplicatedEqualers.js";
import { IMatcher } from "../../interfaces/Matchers/IMatcher.js";
import { Matcher } from "./Matcher.js";
import { TestResult } from "../Tests/TestResult.js";
import { AsyncFunction } from "../../types/AsyncFunction.js";
import {errorTemplate} from "../../Utils/TemplateStrings.js"


export class AsyncMatcherProxy implements IAsyncMatcher {
 
  private m_Matcher: IMatcher;
  private m_ExpectedValueAsyncFunction:AsyncFunction;
  private m_Execution:Promise<any>
  private m_ExecutionResolver:Function;
  private m_ExpectedValuePromise:Promise<ITestResult>;
  private m_TestResultResolver: Function;


  constructor(
    i_AsyncFunctionExpectedValue: AsyncFunction,
    i_BeforeFunctions: Function[],
    i_AfterFunctions: Function[],
    i_Description: string,
  ) {

    this.m_ExpectedValueAsyncFunction = i_AsyncFunctionExpectedValue;
    this.m_Matcher = new Matcher(
      null,
      i_BeforeFunctions,
      i_AfterFunctions,
      i_Description
    );
    this.m_Execution = new Promise((res,rej)=>{this.m_ExecutionResolver=res;})
    this.m_ExpectedValuePromise = new Promise((res,rej)=>{this.m_TestResultResolver=res;})


  }

  get ExpectedValue(): Promise<any> {
    return this.Matcher.ExpectedValue;
  }

  set ExpectedValue(val: Promise<any>) {
    this.Matcher.ExpectedValue = val;
  }

  get ExpectedValuePromise(): Promise<ITestResult> {
    return this.m_ExpectedValuePromise;
  }

  set ExpectedValuePromise(val: Promise<ITestResult>) {
    this.m_ExpectedValuePromise = val;
  }

  get Result(): ITestResult {
    return this.Matcher.Result;
  }

  set Result(val: ITestResult) {
    this.Matcher.Result = val;
  }

  get FailedString(): string {
    return this.Matcher.FailedString;
  }

  set FailedString(val: string) {
    this.Matcher.FailedString = val;
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

  public resolveTestResult(i_TestResult: ITestResult): void {
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
    return this.asyncTestTemplate(
      () => {
        this.Matcher.ExpectedValue === true;
      },
      "false"
    );
  }
  public async toBeFalse(): Promise<ITestResult> {
    return this.asyncTestTemplate(
      () => this.Matcher.ExpectedValue === false,
      "true"
    );
  }

  public async toBeTruthy(): Promise<ITestResult> {
    return this.asyncTestTemplate(
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
    return this.asyncTestTemplate(
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
    return this.asyncTestTemplate(
      () => this.Matcher.ExpectedValue === i_Param,
      i_Param
    );
  }

  public async notToBe(i_Param: any): Promise<ITestResult> {
    return this.asyncTestTemplate(
      () => this.Matcher.ExpectedValue !== i_Param,
      i_Param
    );
  }

  public async toBeLessThan(i_Param: number): Promise<ITestResult> {
    return this.asyncTestTemplate(
      () => this.Matcher.ExpectedValue < i_Param,
      i_Param.toString()
    );
  }

  public async toBeLessThanOrEqual(i_Param: number): Promise<ITestResult> {
    return this.asyncTestTemplate(
      () => this.Matcher.ExpectedValue <= i_Param,
      i_Param.toString()
    );
  }

  public async toBeGreaterThan(i_Param: number): Promise<ITestResult> {
    return this.asyncTestTemplate(
      () => this.Matcher.ExpectedValue > i_Param,
      i_Param.toString()
    );
  }

  public async toBeGreaterThanOrEqual(i_Param: number): Promise<ITestResult> {
    return this.asyncTestTemplate(
      () => this.Matcher.ExpectedValue >= i_Param,
      i_Param.toString()
    );
  }

  public async deepObjectEquals(i_Obj: any): Promise<ITestResult> {
    return this.asyncTestTemplate(
      () => deepObjectEqualsEqualer(this.Matcher.ExpectedValue, i_Obj),
      i_Obj
    );
  }

  public async toContain(i_param: any): Promise<ITestResult> {
    return this.asyncTestTemplate(
      ()=>{
        const result = this.Matcher.ExpectedValue.filter((value: any) => value === i_param)
        return result?true:false;
      },
      i_param
    )
  }
  
  public async toContainEqual(i_param: any): Promise<ITestResult> {
    return this.asyncTestTemplate(
      ()=>{
        const result = this.Matcher.ExpectedValue.filter((value: any) => deepObjectEqualsEqualer(value , i_param))
        return result?true:false;
      },
      i_param
    );
  }

  public async prepareMatcher(): Promise<void> {
    let expectedValue = await this.m_ExpectedValueAsyncFunction();
    this.Matcher.ExpectedValue = expectedValue;
  }

  public execute():void{
    this.m_ExecutionResolver();
  }

  private async asyncTestTemplate(i_ActualTest:Function, i_FailedValue:string):Promise<ITestResult>{
    try{
        await this.m_Execution;
        this.StartAt = new Date();
        this.initMatcher();
        await this.prepareMatcher()
        await this.before();
        const matcherResult = await i_ActualTest();
        await this.after();

        const errorString = matcherResult?null:errorTemplate(JSON.stringify(this.ExpectedValue),JSON.stringify(i_FailedValue));
        this.Result = new TestResult(matcherResult, this.Performance.getCountMS(), this.Description, errorString, this.StartAt,false,null);
        this.resolveTestResult(this.Result);
        ///todo handle lock
        return this.Result;
    }
    catch(err){
        this.Result = new TestResult(false, 0, this.Description, 'test failed', this.StartAt,true,err.message);
        this.resolveTestResult(this.Result);
        return this.Result;
    }
    
}
}
