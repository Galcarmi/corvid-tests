import { ITest } from "../interfaces/ITest.js";
import { AsyncFunction } from "../types/AsyncFunction.js";
import { AsyncMatcherProxy } from "./AsyncMatcherProxy.js";
export declare class AsyncTest implements ITest {
    private m_Description;
    private m_Matcher;
    private m_beforeFunctions;
    private m_AfterFunctions;
    constructor(i_Description: string, i_beforeFunctions: Function[], i_AfterFunctions: Function[]);
    get Description(): string;
    set Description(val: string);
    get Matcher(): AsyncMatcherProxy;
    set Matcher(val: AsyncMatcherProxy);
    get BeforeFunctions(): Function[];
    set BeforeFunctions(val: Function[]);
    get AfterFunctions(): Function[];
    set Result(val: Function[]);
    expect(i_Result: any): AsyncMatcherProxy;
    asyncExpect(i_AsyncFunction: AsyncFunction): AsyncMatcherProxy;
    addBefore(i_BeforeFunc: Function | AsyncFunction): ITest;
    addAfter(i_AfterFunc: Function | AsyncFunction): ITest;
}
