import { ITestResult } from "../Tests/ITestResult.js";
import { TestPerformance } from "../../Performance/Performance.js";
import { IDescribable } from "../Utils/IDescribable.js";
import { IBeforeAfterFunc } from "../Utils/IBeforeAfterFunc.js";

export interface IMatcherProto extends IDescribable, IBeforeAfterFunc{
  // //private fields
  // _result:ITestResult;
  // _description:string;
  // _performance: TestPerformance;
  // _startAt:Date;
  // _beforeFunctions:Function[];
  // _afterFunctions:Function[];

  ////todo merge interfaces
  //access modifiers
  Result: ITestResult;
  Performance: TestPerformance;
  StartAt: Date;
  ExpectedValue: any;
  FailedString: string;

  toBeTruthy(): any;
  toBeFalsy(): any;
  toBe(i_param: any): any;
  toBeTrue(): any;
  toBeFalse(): any;
  notToBe(i_param: any): any;
  toBeLessThan(i_param: number): any;
  toBeLessThanOrEqual(i_param: number): any;
  toBeGreaterThan(i_param: number): any;
  toBeGreaterThanOrEqual(i_param: number): any;
  deepObjectEquals(i_obj: any): any;
  toContain(i_param:any):any;
  toContainEqual(i_param:any):any;
  before(): void;
  after(): void;
  initMatcher(): void;
}
