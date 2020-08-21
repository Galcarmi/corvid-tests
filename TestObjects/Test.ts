import { ITest } from "../interfaces/ITest.js";
import { IMatcher } from "../interfaces/IMatcher.js";
import { Matcher } from "./Matcher.js";


export class Test implements ITest{
  private m_Description: string;
  private m_Matcher: IMatcher;
  private m_BeforeFunctions: Function[];
  private m_AfterFunctions: Function[];

  constructor(
    i_Description: string,
    i_BbeforeFunctions: Function[],
    i_AfterFunctions: Function[]
  ) {
    this.m_Description = i_Description;
    this.m_BeforeFunctions = [...i_BbeforeFunctions];
    this.m_AfterFunctions = [...i_AfterFunctions];
  }

  get Description(): string {
    return this.m_Description;
  }

  set Description(val: string) {
    this.m_Description = val;
  }

  get Matcher(): IMatcher {
    return this.m_Matcher;
  }

  set Matcher(val: IMatcher) {
    this.m_Matcher = val;
  }

  get BeforeFunctions(): Function[] {
    return this.m_BeforeFunctions;
  }

  set BeforeFunctions(val: Function[]) {
    this.m_BeforeFunctions = val;
  }

  get AfterFunctions(): Function[] {
    return this.m_AfterFunctions;
  }

  set Result(val: Function[]) {
    this.m_AfterFunctions = val;
  }

  public expect(i_Result: any): IMatcher {
    this.m_Matcher = new Matcher(
      i_Result,
      this.m_BeforeFunctions,
      this.m_AfterFunctions,
      this.m_Description
    );

    return this.m_Matcher;
  }

  public addBefore(i_BeforeFunc: Function): ITest {
    this.m_BeforeFunctions.push(i_BeforeFunc);
    return this;
  }
  public addAfter(i_AfterFunc: Function): ITest {
    this.m_AfterFunctions.push(i_AfterFunc);
    return this;
  }
}
