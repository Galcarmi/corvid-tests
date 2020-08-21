import { AsyncMatcherProxy } from "./AsyncMatcherProxy.js";
export class AsyncTest {
    constructor(i_Description, i_beforeFunctions, i_AfterFunctions) {
        this.m_Description = i_Description;
        this.m_beforeFunctions = [...i_beforeFunctions];
        this.m_AfterFunctions = [...i_AfterFunctions];
    }
    get Description() {
        return this.m_Description;
    }
    set Description(val) {
        this.m_Description = val;
    }
    get Matcher() {
        return this.m_Matcher;
    }
    set Matcher(val) {
        this.m_Matcher = val;
    }
    get BeforeFunctions() {
        return this.m_beforeFunctions;
    }
    set BeforeFunctions(val) {
        this.m_beforeFunctions = val;
    }
    get AfterFunctions() {
        return this.m_AfterFunctions;
    }
    set Result(val) {
        this.m_AfterFunctions = val;
    }
    expect(i_Result) {
        const resultAsyncFunctionWrapper = async () => { return i_Result; };
        this.m_Matcher = new AsyncMatcherProxy(resultAsyncFunctionWrapper, this.m_beforeFunctions, this.m_AfterFunctions, this.m_Description);
        return this.m_Matcher;
    }
    asyncExpect(i_AsyncFunction) {
        this.m_Matcher = new AsyncMatcherProxy(i_AsyncFunction, this.m_beforeFunctions, this.m_AfterFunctions, this.m_Description);
        return this.m_Matcher;
    }
    addBefore(i_BeforeFunc) {
        this.m_beforeFunctions.push(i_BeforeFunc);
        return this;
    }
    addAfter(i_AfterFunc) {
        this.m_AfterFunctions.push(i_AfterFunc);
        return this;
    }
}
