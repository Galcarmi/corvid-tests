"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    expect(i_Result) {
        const resultAsyncFunctionWrapper = () => __awaiter(this, void 0, void 0, function* () { return i_Result; });
        this.m_Matcher = new AsyncMatcherProxy_js_1.AsyncMatcherProxy(resultAsyncFunctionWrapper, this.m_beforeFunctions, this.m_AfterFunctions, this.m_Description);
        return this.m_Matcher;
    }
    asyncExpect(i_AsyncFunction) {
        this.m_Matcher = new AsyncMatcherProxy_js_1.AsyncMatcherProxy(i_AsyncFunction, this.m_beforeFunctions, this.m_AfterFunctions, this.m_Description);
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
exports.AsyncTest = AsyncTest;
