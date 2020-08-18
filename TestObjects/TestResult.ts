import { ITestResult } from "../interfaces/ITestResult";

export class TestResult implements ITestResult {
  
  _description: string;
  _passed: boolean;
  _timePassed:number;
  _errorString:string;

  constructor(passed:boolean, timePassed:number, description:string){
      this._passed = passed;
      this._timePassed = timePassed;
      this._description = description;
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
