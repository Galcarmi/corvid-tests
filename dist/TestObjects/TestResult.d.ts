import { ITestResult } from "../interfaces/ITestResult.js";
export declare class TestResult implements ITestResult {
    private m_Description;
    private m_Passed;
    private m_TimePassed;
    private m_ErrorString;
    private m_StartAt;
    private m_FailedString;
    private m_ErrorDetected;
    constructor(passed: boolean, timePassed: number, description: string, failedString: string | null, startAt: Date, errorDetected: boolean, errorString: string | null);
    get FailedString(): string | null;
    set FailedString(val: string | null);
    get ErrorDetected(): boolean;
    set ErrorDetected(val: boolean);
    get StartAt(): Date;
    set StartAt(val: Date);
    get Passed(): boolean;
    set Passed(val: boolean);
    get TimePassed(): number;
    set TimePassed(val: number);
    get Description(): string;
    set Description(val: string);
    get ErrorString(): string | null;
    set ErrorString(val: string | null);
}
