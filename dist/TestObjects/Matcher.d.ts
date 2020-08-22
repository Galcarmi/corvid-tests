import { IMatcher } from "../interfaces/IMatcher.js";
import { ITestResult } from "../interfaces/ITestResult.js";
import { TestPerformance } from "../Performance/Performance.js";
export declare class Matcher implements IMatcher {
    private m_ExpectedValue;
    private m_StartAt;
    private m_FailedString;
    private m_Description;
    private m_Result;
    private m_Performance;
    private m_BeforeFunctions;
    private m_AfterFunctions;
    constructor(m_ExpectedValue: any, i_BeforeFunctions: Function[], i_AfterFunctions: Function[], i_Description: string);
    get ExpectedValue(): any;
    set ExpectedValue(val: any);
    get Result(): ITestResult;
    set Result(val: ITestResult);
    get FailedString(): string;
    set FailedString(val: string);
    get Description(): string;
    set Description(val: string);
    get StartAt(): Date;
    set StartAt(val: Date);
    get Performance(): TestPerformance;
    set Performance(val: TestPerformance);
    get BeforeFunctions(): Function[];
    set BeforeFunctions(val: Function[]);
    get AfterFunctions(): Function[];
    set AfterFunctions(val: Function[]);
    initMatcher(): void;
    before(): void;
    after(): void;
    toBeTrue(): ITestResult;
    toBeFalse(): ITestResult;
    toBeTruthy(): ITestResult;
    toBeFalsy(): ITestResult;
    toBe(i_Param: any): ITestResult;
    notToBe(i_Param: any): ITestResult;
    toBeLessThan(i_Param: number): ITestResult;
    toBeLessThanOrEqual(i_Param: number): ITestResult;
    toBeGreaterThan(i_Param: number): ITestResult;
    toBeGreaterThanOrEqual(i_Param: number): ITestResult;
    deepObjectEquals(i_obj: any): ITestResult;
    toContain(i_param: any): ITestResult;
    toContainEqual(i_param: any): ITestResult;
    private testTemplate;
}
