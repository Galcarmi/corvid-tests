import { ITestResult } from "./ITestResult.js";
import { TestPerformance } from "../Performance/Performance.js";
import { IDescribable } from "./IDescribable.js";
import { IBeforeAfterFunc } from "./IBeforeAfterFunc.js";

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
  ErrorString: string;

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
  objectDeepEquals(i_obj: any): any;
  before(): void;
  after(): void;
  initMatcher(): void;
}
