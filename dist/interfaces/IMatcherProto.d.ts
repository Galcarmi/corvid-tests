import { ITestResult } from "./ITestResult.js";
import { TestPerformance } from "../Performance/Performance.js";
import { IDescribable } from "./IDescribable.js";
import { IBeforeAfterFunc } from "./IBeforeAfterFunc.js";
export interface IMatcherProto extends IDescribable, IBeforeAfterFunc {
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
    toContain(i_param: any): any;
    toContainEqual(i_param: any): any;
    before(): void;
    after(): void;
    initMatcher(): void;
}
