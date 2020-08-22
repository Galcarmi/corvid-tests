"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const Matcher_js_1 = require("../Matchers/Matcher.js");
class Test {
    constructor(i_Description, i_BbeforeFunctions, i_AfterFunctions) {
        this.m_Description = i_Description;
        this.m_BeforeFunctions = [...i_BbeforeFunctions];
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
        return this.m_BeforeFunctions;
    }
    set BeforeFunctions(val) {
        this.m_BeforeFunctions = val;
    }
    get AfterFunctions() {
        return this.m_AfterFunctions;
    }
    set Result(val) {
        this.m_AfterFunctions = val;
    }
    expect(i_Result) {
        this.m_Matcher = new Matcher_js_1.Matcher(i_Result, this.m_BeforeFunctions, this.m_AfterFunctions, this.m_Description);
        return this.m_Matcher;
    }
    addBefore(i_BeforeFunc) {
        this.m_BeforeFunctions.push(i_BeforeFunc);
        return this;
    }
    addAfter(i_AfterFunc) {
        this.m_AfterFunctions.push(i_AfterFunc);
        return this;
    }
}
exports.Test = Test;
