import { TestResult } from "./TestResult";
import { IMatcher } from "../interfaces/IMatcher";
import { ITestResult } from "../interfaces/ITestResult";
import { TestPerformance } from "../Performance/Performance";
import {testTemplate} from '../TestTemplates/MatcherTemplate'
import {deepObjectEquals} from './ComplicatedEqualers'

export class Matcher implements IMatcher {
  _startAt: Date;
  _errorString: string;
  _description:string;
  _result: ITestResult;
  _performance: TestPerformance;
  _beforeFunctions: Function[];
  _afterFunctions: Function[];

  constructor(private expectedValue: any, beforeFunctions:Function[], afterFunctions:Function[], description:string) {
    this._performance = new TestPerformance();
    this._beforeFunctions = beforeFunctions;
    this._afterFunctions = afterFunctions;
    this._description = description;
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
    return testTemplate(this,()=>{this.expectedValue === true})
  }
  toBeFalse():ITestResult{
    return testTemplate(this,()=>this.expectedValue === false)
  }

  toBeTruthy():ITestResult{
    return testTemplate(this,()=>{
      if(this.expectedValue){
        return true;
      }
      else{
        return false;
      }
    })
  }

  toBeFalsy():ITestResult{
    return testTemplate(this,()=>{
      if(this.expectedValue){
        return false;
      }
      else{
        return true;
      }
    })
  }

  equalValue(param:any):ITestResult{
    return testTemplate(this, ()=>this.expectedValue === param)
  }

  notEqualValue(param:any):ITestResult{
    return testTemplate(this, ()=>this.expectedValue !== param)
  }

  toBeLessThan(param:number):ITestResult{
    return testTemplate(this, ()=>this.expectedValue < param)
  }

  toBeLessThanOrEqual(param:number):ITestResult{
    return testTemplate(this, ()=>this.expectedValue <= param)
  }

  toBeGreaterThan(param:number):ITestResult{
    return testTemplate(this, ()=>this.expectedValue > param)
  }

  toBeGreaterThanOrEqual(param:number):ITestResult{
    return testTemplate(this, ()=>this.expectedValue >= param)
  }

  objectDeepEquals(obj:any):ITestResult{
    return testTemplate(this, ()=>deepObjectEquals(this.expectedValue,obj))
  }
  
}
