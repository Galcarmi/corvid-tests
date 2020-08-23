import { ITest } from "../../interfaces/Tests/ITest.js";
import { AsyncFunction } from "../../types/AsyncFunction.js";
import { AsyncMatcherProxy } from "../Matchers/AsyncMatcherProxy.js";
import { Lock } from "../TestSuiteManager/Lock.js";

export class AsyncTest implements ITest {
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

  public expect(i_Result: any): AsyncMatcherProxy {
    const resultAsyncFunctionWrapper = async ()=>{return i_Result};
    this.m_Matcher = new AsyncMatcherProxy(
      resultAsyncFunctionWrapper,
      this.m_beforeFunctions,
      this.m_AfterFunctions,
      this.m_Description,
    );

    return this.m_Matcher;
  }

  public asyncExpect(i_AsyncFunction: AsyncFunction): AsyncMatcherProxy {
    this.m_Matcher = new AsyncMatcherProxy(
      i_AsyncFunction,
      this.m_beforeFunctions,
      this.m_AfterFunctions,
      this.m_Description,
    );

    return this.m_Matcher;
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
