import { ITestResult } from "./ITestResult";
import { TestPerformance } from "../Performance/Performance";
import { TestResult } from "../TestObjects/TestResult";

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
  TestResultStatus: Promise<any>;

  resolveTestResult(i_testResult: ITestResult): void;
  toBeTruthy(): Promise<ITestResult>;
  toBeFalsy(): Promise<ITestResult>;
  equalValue(i_param: any): Promise<ITestResult>;
  toBeTrue(): Promise<ITestResult>;
  toBeFalse(): Promise<ITestResult>;
  notEqualValue(i_param: any): Promise<ITestResult>;
  toBeLessThan(i_param: number): Promise<ITestResult>;
  toBeLessThanOrEqual(i_param: number): Promise<ITestResult>;
  toBeGreaterThan(i_param: number): Promise<ITestResult>;
  toBeGreaterThanOrEqual(i_param: number): Promise<ITestResult>;
  objectDeepEquals(i_obj: any): Promise<ITestResult>;
  before(): void;
  after(): void;
  initMatcher(): void;
}
