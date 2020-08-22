import { IDescribable } from "./IDescribable";
export interface ITestResult extends IDescribable {
    Passed: boolean;
    TimePassed: number;
    FailedString: string | null;
    StartAt: Date;
    ErrorDetected: boolean;
    ErrorString: string | null;
}
