import { ITest } from "../../interfaces/Tests/ITest.js";
import { AsyncFunction } from "../../types/AsyncFunction.js";
import { AsyncMatcherProxy } from "../Matchers/AsyncMatcherProxy.js";
import { IAsyncTest } from "../../interfaces/Tests/IAsyncTest.js";

export class AsyncTest implements IAsyncTest {
  private m_Description: string;
  private m_Matcher: AsyncMatcherProxy;
  private m_beforeFunctions: Function[];
  private m_AfterFunctions: Function[];

  constructor(
    i_Description: string,
    i_beforeFunctions: Function[],
    i_AfterFunctions: Function[],
  ) {
    this.m_Description = i_Description;
    this.m_beforeFunctions = [...i_beforeFunctions];
    this.m_AfterFunctions = [...i_AfterFunctions];
  }

  get Description(): string {
    return this.m_Description;
  }

  set Description(val: string) {
    this.m_Description = val;
  }

  get Matcher(): AsyncMatcherProxy {
    return this.m_Matcher;
  }

  set Matcher(val: AsyncMatcherProxy) {
    this.m_Matcher = val;
  }

  get BeforeFunctions(): Function[] {
    return this.m_beforeFunctions;
  }

  set BeforeFunctions(val: Function[]) {
    this.m_beforeFunctions = val;
  }

  get AfterFunctions(): Function[] {
    return this.m_AfterFunctions;
  }

  set Result(val: Function[]) {
    this.m_AfterFunctions = val;
  }

  private expectHandler(i_Result: any): AsyncMatcherProxy {
    const resultAsyncFunctionWrapper = async ()=>{return i_Result};
    this.m_Matcher = new AsyncMatcherProxy(
      resultAsyncFunctionWrapper,
      this.m_beforeFunctions,
      this.m_AfterFunctions,
      this.m_Description,
    );

    return this.m_Matcher;
  }

  private asyncExpect(i_Func: AsyncFunction|Function): AsyncMatcherProxy {
    this.m_Matcher = new AsyncMatcherProxy(
      i_Func,
      this.m_beforeFunctions,
      this.m_AfterFunctions,
      this.m_Description,
    );

    return this.m_Matcher;
  }

  public expect(i_Input:AsyncFunction|Function|number|string|Object):AsyncMatcherProxy{
    if(typeof(i_Input) === 'object' || typeof(i_Input) === 'string' || typeof(i_Input) === 'number' || typeof(i_Input) === 'boolean'|| typeof(i_Input) === 'undefined'){
      return this.expectHandler(i_Input);
    }
    else{
      return this.asyncExpect(i_Input);
    }
  }

  public addBefore(i_BeforeFunc: Function|AsyncFunction): ITest {
    this.m_beforeFunctions.push(i_BeforeFunc);
    return this;
  }
  public addAfter(i_AfterFunc: Function|AsyncFunction): ITest {
    this.m_AfterFunctions.push(i_AfterFunc);
    return this;
  }
}
