"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncTest = void 0;
const AsyncMatcherProxy_js_1 = require("../Matchers/AsyncMatcherProxy.js");
class AsyncTest {
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
    expectHandler(i_Result) {
        const resultAsyncFunctionWrapper = async () => { return i_Result; };
        this.m_Matcher = new AsyncMatcherProxy_js_1.AsyncMatcherProxy(resultAsyncFunctionWrapper, this.m_beforeFunctions, this.m_AfterFunctions, this.m_Description);
        return this.m_Matcher;
    }
    asyncExpect(i_Func) {
        this.m_Matcher = new AsyncMatcherProxy_js_1.AsyncMatcherProxy(i_Func, this.m_beforeFunctions, this.m_AfterFunctions, this.m_Description);
        return this.m_Matcher;
    }
    expect(i_Input) {
        if (typeof (i_Input) === 'object' || typeof (i_Input) === 'string' || typeof (i_Input) === 'number' || typeof (i_Input) === 'boolean' || typeof (i_Input) === 'undefined') {
            return this.expectHandler(i_Input);
        }
        else {
            return this.asyncExpect(i_Input);
        }
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
exports.AsyncTest = AsyncTest;
