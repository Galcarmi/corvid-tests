import { ITest } from "../interfaces/ITest.js";
import { IMatcher } from "../interfaces/IMatcher.js";
export declare class Test implements ITest {
    private m_Description;
    private m_Matcher;
    private m_BeforeFunctions;
    private m_AfterFunctions;
    constructor(i_Description: string, i_BbeforeFunctions: Function[], i_AfterFunctions: Function[]);
    get Description(): string;
    set Description(val: string);
    get Matcher(): IMatcher;
    set Matcher(val: IMatcher);
    get BeforeFunctions(): Function[];
    set BeforeFunctions(val: Function[]);
    get AfterFunctions(): Function[];
    set Result(val: Function[]);
    expect(i_Result: any): IMatcher;
    addBefore(i_BeforeFunc: Function): ITest;
    addAfter(i_AfterFunc: Function): ITest;
}
