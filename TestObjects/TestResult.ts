import { ITestResult } from "../interfaces/ITestResult";

export class TestResult implements ITestResult {
  
  
  private _description: string;
  private _passed: boolean;
  private _timePassed:number;
  private _errorString:string;
  private _startAt:string;

  constructor(passed:boolean, timePassed:number, description:string, errorString:string|null, startAt:string){
      this._startAt = startAt;
      this._passed = passed;
      this._timePassed = timePassed;
      this._description = description;
      if(errorString !== null){
        this._errorString = errorString;
      }
  }

  get StartAt(): string {
    return this._startAt;
  }

  set StartAt(val:string){
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
  toString(): string {
    return `${this._description} - ${this._passed?'passed':'failed'} - ${this._passed}ms`;
  }
}
