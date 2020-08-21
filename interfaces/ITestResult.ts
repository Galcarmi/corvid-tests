import { IDescribable } from "./IDescribable";

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
    ErrorString:string;
    StartAt:Date;

}