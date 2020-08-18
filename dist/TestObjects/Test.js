"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const Matcher_1 = require("./Matcher");
class Test {
    constructor(description, beforeFunctions, afterFunctions) {
        this._description = description;
        this._beforeFunctions = [...beforeFunctions];
        this._afterFunctions = [...afterFunctions];
    }
    get Description() {
        return this._description;
    }
    set Description(val) {
        this._description = val;
    }
    get Matcher() {
        return this._matcher;
    }
    set Matcher(val) {
        this._matcher = val;
    }
    get BeforeFunctions() {
        return this._beforeFunctions;
    }
    set BeforeFunctions(val) {
        this._beforeFunctions = val;
    }
    get AfterFunctions() {
        return this._afterFunctions;
    }
    set Result(val) {
        this._afterFunctions = val;
    }
    expect(result) {
        this._matcher = new Matcher_1.Matcher(result, this._beforeFunctions, this._afterFunctions, this._description);
        return this._matcher;
    }
    async asyncExpect(asyncFunction) {
        const asyncResult = await asyncFunction();
        this._matcher = new Matcher_1.Matcher(asyncResult, this._beforeFunctions, this._afterFunctions, this._description);
        return this._matcher;
    }
    addBefore(beforeFunc) {
        this._beforeFunctions.push(beforeFunc);
        return this;
    }
    addAfter(afterFunc) {
        this._afterFunctions.push(afterFunc);
        return this;
    }
}
exports.Test = Test;
