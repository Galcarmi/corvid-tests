import { IAsyncMatcher } from "../interfaces/IAsyncMatcher";
import { ITestResult } from "../interfaces/ITestResult";
import { TestPerformance } from "../Performance/Performance";
import {AsyncTestTemplate} from '../TestTemplates/AsyncMatcherTemplate'
import {deepObjectEquals} from './ComplicatedEqualers'
import {IBeforeAfterFunc} from '../interfaces/IBeforeAfterFunc'
import {IDescribable} from '../interfaces/IDescribable'
import { IMatcher } from "../interfaces/IMatcher";
import { Matcher } from "./Matcher";
import { TestResult } from "./TestResult";

export class AsyncMatcherProxy implements IAsyncMatcher, IBeforeAfterFunc, IDescribable {
  
  private _matcher:IMatcher;
  private _testResultStatus:Promise<TestResult>;
  private _testResultResolver:Function;

  constructor(private _expectedPromiseValue: Promise<any>, beforeFunctions:Function[], afterFunctions:Function[], description:string) {
    this._matcher = new Matcher(null, beforeFunctions, afterFunctions, description) ;
    this._testResultStatus = new Promise((res,rej)=>{this._testResultResolver = res});

  }

  get TestResultStatus(): Promise<any> {
    return this._testResultStatus;
  }

  set TestResultStatus(val:Promise<any>){
    this._testResultStatus = val;
  }

  get ExpectedValue(): Promise<any> {
    return this.Matcher.ExpectedValue;
  }

  set ExpectedValue(val:Promise<any>){
    this.Matcher.ExpectedValue = val;
  }

  get Result(): ITestResult {
    return this.Matcher.Result;
  }

  set Result(val:ITestResult){
    this.Matcher.Result = val;
  }

  get ErrorString(): string {
    return this.Matcher.ErrorString;
  }

  set ErrorString(val:string){
    this.Matcher.ErrorString = val;
  }

  get Description(): string {
    return this.Matcher.Description;
  }

  set Description(val:string){
    this.Matcher.Description = val;
  }

  get StartAt(): Date {
    return this.Matcher.StartAt;
  }

  set StartAt(val:Date){
    this.Matcher.StartAt = val;
  }

  get Performance(): TestPerformance {
    return this.Matcher.Performance;
  }

  set Performance(val:TestPerformance){
    this.Matcher.Performance = val;
  }

  get BeforeFunctions(): Function[] {
    return this.Matcher.BeforeFunctions;
  }

  set BeforeFunctions(val:Function[]){
    this.Matcher.BeforeFunctions = val;
  }
  get AfterFunctions(): Function[] {
    return this.Matcher.AfterFunctions;
  }

  set AfterFunctions(val:Function[]){
    this.Matcher.AfterFunctions = val;
  }

  ///todo check why it has to be type of any
  get Matcher(): any {
    return this._matcher;
  }

  set Matcher(val:any){
    this._matcher = val;
  }

  public resolveTestResult(testResult:TestResult):void{
    this._testResultResolver(testResult);
  }

  public initMatcher(): void {
    this.Matcher.BeforeFunctions.unshift(()=>{
      this.Matcher.Performance.startCount();
    })

    this.Matcher.AfterFunctions.push(()=>{
      this.Matcher.Performance.endCount();
    })
  }

  public async before() {
    for(const func of this.Matcher.BeforeFunctions){
      await func();
    }
  }

  public async after() {
    for(const func of this.Matcher.AfterFunctions){
      await func();
    }
  }


  public async toBeTrue(): Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(this,()=>{this.Matcher.ExpectedValue === true},'false')
  }
  public async toBeFalse():Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(this,()=>this.Matcher.ExpectedValue === false, 'true')
  }

  public async toBeTruthy():Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(this,()=>{
      if(this.Matcher.ExpectedValue){
        return true;
      }
      else{
        return false;
      }
    },'falsy')
  }

  public async toBeFalsy():Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(this,()=>{
      if(this.Matcher.ExpectedValue){
        return false;
      }
      else{
        return true;
      }
    },'truthy')
  }

  public async equalValue(param:any):Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(this, ()=>this.Matcher.ExpectedValue === param, param)
  }

  public async notEqualValue(param:any):Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(this, ()=>this.Matcher.ExpectedValue !== param, param)
  }

  public async toBeLessThan(param:number):Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(this, ()=>this.Matcher.ExpectedValue < param, param.toString())
  }

  public async toBeLessThanOrEqual(param:number):Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(this, ()=>this.Matcher.ExpectedValue <= param, param.toString())
  }

  public async toBeGreaterThan(param:number):Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(this, ()=>this.Matcher.ExpectedValue > param, param.toString())
  }

  public async toBeGreaterThanOrEqual(param:number):Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(this, ()=>this.Matcher.ExpectedValue >= param, param.toString())
  }

  public async objectDeepEquals(obj:any):Promise<ITestResult> {
    await this.prepareMatcher();
    return AsyncTestTemplate(this, ()=>deepObjectEquals(this.Matcher.ExpectedValue,obj), obj)
  }

  public async prepareMatcher():Promise<void>{
    let expectedValue = await this._expectedPromiseValue;
    this.Matcher.ExpectedValue = expectedValue;
  }
  
}
