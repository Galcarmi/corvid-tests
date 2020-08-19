import { ITestResult } from "./ITestResult";
import { TestPerformance } from "../Performance/Performance";

export interface IAsyncMatcher {
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
  BeforeFunctions: Function[];
  AfterFunctions: Function[];

  toBeTruthy(): Promise<ITestResult>;
  toBeFalsy(): Promise<ITestResult>;
  equalValue(param: any): Promise<ITestResult>;
  toBeTrue(): Promise<ITestResult>;
  toBeFalse(): Promise<ITestResult>;
  notEqualValue(param: any): Promise<ITestResult>;
  toBeLessThan(param: number): Promise<ITestResult>;
  toBeLessThanOrEqual(param: number): Promise<ITestResult>;
  toBeGreaterThan(param: number): Promise<ITestResult>;
  toBeGreaterThanOrEqual(param: number): Promise<ITestResult>;
  objectDeepEquals(obj: any): Promise<ITestResult>;
  before(): void;
  after(): void;
  initMatcher(): void;
}
