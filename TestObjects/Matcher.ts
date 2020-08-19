import { TestResult } from "./TestResult";
import { IMatcher } from "../interfaces/IMatcher";
import { ITestResult } from "../interfaces/ITestResult";
import { TestPerformance } from "../Performance/Performance";
import {testTemplate} from '../TestTemplates/MatcherTemplate'
import {deepObjectEquals} from './ComplicatedEqualers'
import {IBeforeAfterFunc} from '../interfaces/IBeforeAfterFunc'
import {IDescribable} from '../interfaces/IDescribable'

export class Matcher implements IMatcher, IBeforeAfterFunc, IDescribable {
  
  private _startAt: Date;
  private _errorString: string;
  private _description:string;
  private _result: ITestResult;
  private _performance: TestPerformance;
  private _beforeFunctions: Function[];
  private _afterFunctions: Function[];

  constructor(private _expectedValue: any, beforeFunctions:Function[], afterFunctions:Function[], description:string) {
    this._performance = new TestPerformance();
    this._beforeFunctions = beforeFunctions;
    this._afterFunctions = afterFunctions;
    this._description = description;
  }

  get ExpectedValue(): any {
    return this._expectedValue;
  }

  set ExpectedValue(val:any){
    this._expectedValue = val;
  }

  get Result(): ITestResult {
    return this._result;
  }

  set Result(val:ITestResult){
    this._result = val;
  }

  get ErrorString(): string {
    return this._errorString;
  }

  set ErrorString(val:string){
    this._errorString = val;
  }

  get Description(): string {
    return this._description;
  }

  set Description(val:string){
    this._description = val;
  }

  get StartAt(): Date {
    return this._startAt;
  }

  set StartAt(val:Date){
    this._startAt = val;
  }

  get Performance(): TestPerformance {
    return this._performance;
  }

  set Performance(val:TestPerformance){
    this._performance = val;
  }

  get BeforeFunctions(): Function[] {
    return this._beforeFunctions;
  }

  set BeforeFunctions(val:Function[]){
    this._beforeFunctions = val;
  }
  get AfterFunctions(): Function[] {
    return this._afterFunctions;
  }

  set AfterFunctions(val:Function[]){
    this._afterFunctions = val;
  }

  initMatcher(): void {
    this._beforeFunctions.push(()=>{
      this._performance.startCount();
    })

    this._afterFunctions.push(()=>{
      //todo add it to the start of the array
      this._performance.endCount();
    })
  }

  before() {
    for(const func of this._beforeFunctions){
      func();
    }
  }

  after() {
    for(const func of this._afterFunctions){
      func();
    }
  }


  toBeTrue(): ITestResult {
    return testTemplate(this,()=>{this._expectedValue === true},'false')
  }
  toBeFalse():ITestResult{
    return testTemplate(this,()=>this._expectedValue === false, 'true')
  }

  toBeTruthy():ITestResult{
    return testTemplate(this,()=>{
      if(this._expectedValue){
        return true;
      }
      else{
        return false;
      }
    },'falsy')
  }

  toBeFalsy():ITestResult{
    return testTemplate(this,()=>{
      if(this._expectedValue){
        return false;
      }
      else{
        return true;
      }
    },'truthy')
  }

  equalValue(param:any):ITestResult{
    return testTemplate(this, ()=>this._expectedValue === param, param)
  }

  notEqualValue(param:any):ITestResult{
    return testTemplate(this, ()=>this._expectedValue !== param, param)
  }

  toBeLessThan(param:number):ITestResult{
    return testTemplate(this, ()=>this._expectedValue < param, param.toString())
  }

  toBeLessThanOrEqual(param:number):ITestResult{
    return testTemplate(this, ()=>this._expectedValue <= param, param.toString())
  }

  toBeGreaterThan(param:number):ITestResult{
    return testTemplate(this, ()=>this._expectedValue > param, param.toString())
  }

  toBeGreaterThanOrEqual(param:number):ITestResult{
    return testTemplate(this, ()=>this._expectedValue >= param, param.toString())
  }

  objectDeepEquals(obj:any):ITestResult{
    return testTemplate(this, ()=>deepObjectEquals(this._expectedValue,obj), obj)
  }
  
}
