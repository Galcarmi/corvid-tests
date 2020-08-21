import { ITestResult } from "./ITestResult.js";
import {IMatcherProto} from './IMatcherProto';

export interface IMatcher extends IMatcherProto{
  // //private fields
  // _result:ITestResult;
  // _description:string;
  // _performance: TestPerformance;
  // _startAt:Date;
  // _beforeFunctions:Function[];
  // _afterFunctions:Function[];

  ////todo merge interfaces
  //access modifiers

  toBeTruthy(): ITestResult;
  toBeFalsy(): ITestResult;
  toBe(i_param: any): ITestResult;
  toBeTrue(): ITestResult;
  toBeFalse(): ITestResult;
  notToBe(i_param: any): ITestResult;
  toBeLessThan(i_param: number): ITestResult;
  toBeLessThanOrEqual(i_param: number): ITestResult;
  toBeGreaterThan(i_param: number): ITestResult;
  toBeGreaterThanOrEqual(i_param: number): ITestResult;
  deepObjectEquals(i_obj: any): ITestResult;
  toContain(i_param:any):ITestResult;
  toContainEqual(i_param:any):ITestResult;
  before(): void;
  after(): void;
  initMatcher(): void;
}
