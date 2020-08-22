import { ITestResult } from "../Tests/ITestResult.js";
import { IMatcherProto } from "./IMatcherProto.js";



export interface IAsyncMatcher extends IMatcherProto{
  // //private fields
  // _result:ITestResult;
  // _description:string;
  // _performance: TestPerformance;
  // _startAt:Date;
  // _beforeFunctions:Function[];
  // _afterFunctions:Function[];

  ////todo merge interfaces
  //access modifiers
 
  TestResultStatus: Promise<any>;

  resolveTestResult(i_testResult: ITestResult): void;
  toBeTruthy(): Promise<ITestResult>;
  toBeFalsy(): Promise<ITestResult>;
  toBe(i_param: any): Promise<ITestResult>;
  toBeTrue(): Promise<ITestResult>;
  toBeFalse(): Promise<ITestResult>;
  notToBe(i_param: any): Promise<ITestResult>;
  toBeLessThan(i_param: number): Promise<ITestResult>;
  toBeLessThanOrEqual(i_param: number): Promise<ITestResult>;
  toBeGreaterThan(i_param: number): Promise<ITestResult>;
  toBeGreaterThanOrEqual(i_param: number): Promise<ITestResult>;
  deepObjectEquals(i_obj: any): Promise<ITestResult>;
  toContain(i_param:any):Promise<ITestResult>;
  toContainEqual(i_param:any):Promise<ITestResult>;
  before(): void;
  after(): void;
  initMatcher(): void;
  prepareMatcher(): Promise<void>
}
