import { ITestResult } from "./ITestResult.js";
import { TestPerformance } from "../Performance/Performance.js";
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
  objectDeepEquals(i_obj: any): ITestResult;
  before(): void;
  after(): void;
  initMatcher(): void;
}
