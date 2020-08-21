import { ITestResult } from "./ITestResult.js";
import { TestPerformance } from "../Performance/Performance.js";

export interface IMatcher {
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
  Description: string;

  toBeTruthy(): ITestResult;
  toBeFalsy(): ITestResult;
  equalValue(i_param: any): ITestResult;
  toBeTrue(): ITestResult;
  toBeFalse(): ITestResult;
  notEqualValue(i_param: any): ITestResult;
  toBeLessThan(i_param: number): ITestResult;
  toBeLessThanOrEqual(i_param: number): ITestResult;
  toBeGreaterThan(i_param: number): ITestResult;
  toBeGreaterThanOrEqual(i_param: number): ITestResult;
  objectDeepEquals(i_obj: any): ITestResult;
  before(): void;
  after(): void;
  initMatcher(): void;
}
