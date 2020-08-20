import { ITestResult } from "../interfaces/ITestResult";
import { IDescribable } from "../interfaces/IDescribable";

export class TestResult implements ITestResult, IDescribable {
  
  
  private _description: string;
  private _passed: boolean;
  private _timePassed:number;
  private _errorString:string;
  private _startAt:Date;

  constructor(passed:boolean, timePassed:number, description:string, errorString:string|null, startAt:Date){
      this._startAt = startAt;
      this._passed = passed;
      this._timePassed = timePassed;
      this._description = description;
      if(errorString !== null){
        this._errorString = errorString;
      }
  }

  get StartAt(): Date {
    return this._startAt;
  }

  set StartAt(val:Date){
    this._startAt = val;
  }

  get Passed(): boolean {
    return this._passed;
  }

  set Passed(val:boolean){
    this._passed = val;
  }

  get TimePassed(): number {
    return this._timePassed;
  }

  set TimePassed(val:number){
    this._timePassed = val;
  }

  get Description(): string {
    return this._description;
  }

  set Description(val:string){
    this._description = val;
  }

  get ErrorString(): string {
    return this._errorString;
  }

  set ErrorString(val:string){
    this._errorString = val;
  }
}
