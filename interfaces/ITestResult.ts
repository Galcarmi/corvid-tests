export interface ITestResult{
    _passed:boolean
    _timePassed:number;
    _description:string;
    _errorString:string;

    Passed:boolean
    TimePassed:number;
    Description:string;
    ErrorString:string;


    toString():string;
}