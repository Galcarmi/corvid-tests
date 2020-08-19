import {ITestResult} from './ITestResult'
import { TestPerformance } from '../Performance/Performance';

export interface IMatcher{

    // //private fields
    // _result:ITestResult;
    // _description:string;
    // _performance: TestPerformance;
    // _startAt:Date;
    // _beforeFunctions:Function[];
    // _afterFunctions:Function[];
   

    //access modifiers
    Result:ITestResult;
    Performance: TestPerformance;
    StartAt:Date;
    ExpectedValue:any;

    


    toBeTruthy():ITestResult;
    toBeFalsy():ITestResult;
    equalValue(param:any):ITestResult;
    toBeTrue(): ITestResult;
    toBeFalse():ITestResult;
    equalValue(param:any):ITestResult;
    notEqualValue(param:any):ITestResult;
    toBeLessThan(param:number):ITestResult;
    toBeLessThanOrEqual(param:number):ITestResult;
    toBeGreaterThan(param:number):ITestResult;
    toBeGreaterThanOrEqual(param:number):ITestResult;
    objectDeepEquals(obj:any):ITestResult;
    before():void;
    after():void;
    initMatcher():void;

}