import { IDescribable } from "../Utils/IDescribable";

export interface ITestResult extends IDescribable{

    //private fields
    // _passed:boolean
    // _timePassed:number;
    // _description:string;
    // _errorString:string;
    // _startAt:Date;

    //access modifiers
    Passed:boolean
    TimePassed:number;
    FailedString:string|null;
    StartAt:Date;
    ErrorDetected:boolean;
    ErrorString:string|null;

}