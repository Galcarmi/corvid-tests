import { ITestResult } from "../interfaces/ITestResult.js";
import { ISyncTestSuite } from "../interfaces/ISyncTestSuite.js";
import { ISyncTest } from "../interfaces/ISyncTest.js";
export declare class TestSuite implements ISyncTestSuite {
    private m_BeforeEach;
    private m_AfterEach;
    private m_Tests;
    private m_Description;
    constructor(i_Description: string);
    get Description(): string;
    set Description(val: string);
    get Tests(): ISyncTest[];
    set Tests(val: ISyncTest[]);
    get BeforeEach(): Function[];
    set BeforeEach(val: Function[]);
    get AfterEach(): Function[];
    set AfterEach(val: Function[]);
    addTest(i_TestDescription: string): ISyncTest;
    getAllTestsResults(): ITestResult[];
    getPassedTestsResults(): ITestResult[];
    getFailedTestsResults(): ITestResult[];
    addBeforeEach(i_FuncBefore: Function): ISyncTestSuite;
    addAfterEach(i_FuncAfter: Function): ISyncTestSuite;
}
