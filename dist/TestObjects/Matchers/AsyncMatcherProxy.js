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
exports.AsyncMatcherProxy = void 0;
const ComplicatedEqualers_js_1 = require("../Utils/ComplicatedEqualers.js");
const Matcher_js_1 = require("./Matcher.js");
const TestResult_js_1 = require("../Tests/TestResult.js");
const TemplateStrings_js_1 = require("../../Utils/TemplateStrings.js");
class AsyncMatcherProxy {
    constructor(i_AsyncFunctionExpectedValue, i_BeforeFunctions, i_AfterFunctions, i_Description) {
        this.m_ExpectedPromiseValue = i_AsyncFunctionExpectedValue();
        this.m_Matcher = new Matcher_js_1.Matcher(null, i_BeforeFunctions, i_AfterFunctions, i_Description);
        this.m_TestResultStatus = new Promise((res, rej) => {
            this.m_TestResultResolver = res;
        });
    }
    get TestResultStatus() {
        return this.m_TestResultStatus;
    }
    set TestResultStatus(val) {
        this.m_TestResultStatus = val;
    }
    get ExpectedValue() {
        return this.Matcher.ExpectedValue;
    }
    set ExpectedValue(val) {
        this.Matcher.ExpectedValue = val;
    }
    get Result() {
        return this.Matcher.Result;
    }
    set Result(val) {
        this.Matcher.Result = val;
    }
    get FailedString() {
        return this.Matcher.FailedString;
    }
    set FailedString(val) {
        this.Matcher.FailedString = val;
    }
    get Description() {
        return this.Matcher.Description;
    }
    set Description(val) {
        this.Matcher.Description = val;
    }
    get StartAt() {
        return this.Matcher.StartAt;
    }
    set StartAt(val) {
        this.Matcher.StartAt = val;
    }
    get Performance() {
        return this.Matcher.Performance;
    }
    set Performance(val) {
        this.Matcher.Performance = val;
    }
    get BeforeFunctions() {
        return this.Matcher.BeforeFunctions;
    }
    set BeforeFunctions(val) {
        this.Matcher.BeforeFunctions = val;
    }
    get AfterFunctions() {
        return this.Matcher.AfterFunctions;
    }
    set AfterFunctions(val) {
        this.Matcher.AfterFunctions = val;
    }
    ///todo check why it has to be type of any
    get Matcher() {
        return this.m_Matcher;
    }
    set Matcher(val) {
        this.m_Matcher = val;
    }
    resolveTestResult(i_TestResult) {
        this.m_TestResultResolver(i_TestResult);
    }
    initMatcher() {
        this.Matcher.BeforeFunctions.unshift(() => {
            this.Matcher.Performance.startCount();
        });
        this.Matcher.AfterFunctions.push(() => {
            this.Matcher.Performance.endCount();
        });
    }
    before() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const func of this.Matcher.BeforeFunctions) {
                yield func();
            }
        });
    }
    after() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const func of this.Matcher.AfterFunctions) {
                yield func();
            }
        });
    }
    toBeTrue() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.asyncTestTemplate(() => {
                this.Matcher.ExpectedValue === true;
            }, "false");
        });
    }
    toBeFalse() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.asyncTestTemplate(() => this.Matcher.ExpectedValue === false, "true");
        });
    }
    toBeTruthy() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.asyncTestTemplate(() => {
                if (this.Matcher.ExpectedValue) {
                    return true;
                }
                else {
                    return false;
                }
            }, "falsy");
        });
    }
    toBeFalsy() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.asyncTestTemplate(() => {
                if (this.Matcher.ExpectedValue) {
                    return false;
                }
                else {
                    return true;
                }
            }, "truthy");
        });
    }
    toBe(i_Param) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.asyncTestTemplate(() => this.Matcher.ExpectedValue === i_Param, i_Param);
        });
    }
    notToBe(i_Param) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.asyncTestTemplate(() => this.Matcher.ExpectedValue !== i_Param, i_Param);
        });
    }
    toBeLessThan(i_Param) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.asyncTestTemplate(() => this.Matcher.ExpectedValue < i_Param, i_Param.toString());
        });
    }
    toBeLessThanOrEqual(i_Param) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.asyncTestTemplate(() => this.Matcher.ExpectedValue <= i_Param, i_Param.toString());
        });
    }
    toBeGreaterThan(i_Param) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.asyncTestTemplate(() => this.Matcher.ExpectedValue > i_Param, i_Param.toString());
        });
    }
    toBeGreaterThanOrEqual(i_Param) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.asyncTestTemplate(() => this.Matcher.ExpectedValue >= i_Param, i_Param.toString());
        });
    }
    deepObjectEquals(i_Obj) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.asyncTestTemplate(() => ComplicatedEqualers_js_1.deepObjectEqualsEqualer(this.Matcher.ExpectedValue, i_Obj), i_Obj);
        });
    }
    toContain(i_param) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.asyncTestTemplate(() => {
                const result = this.Matcher.ExpectedValue.filter((value) => value === i_param);
                return result ? true : false;
            }, i_param);
        });
    }
    toContainEqual(i_param) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.asyncTestTemplate(() => {
                const result = this.Matcher.ExpectedValue.filter((value) => ComplicatedEqualers_js_1.deepObjectEqualsEqualer(value, i_param));
                return result ? true : false;
            }, i_param);
        });
    }
    prepareMatcher() {
        return __awaiter(this, void 0, void 0, function* () {
            let expectedValue = yield this.m_ExpectedPromiseValue;
            this.Matcher.ExpectedValue = expectedValue;
        });
    }
    asyncTestTemplate(i_ActualTest, i_FailedValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.StartAt = new Date();
                this.initMatcher();
                yield this.prepareMatcher();
                yield this.before();
                const matcherResult = yield i_ActualTest();
                yield this.after();
                const errorString = matcherResult ? null : TemplateStrings_js_1.errorTemplate(JSON.stringify(this.ExpectedValue), JSON.stringify(i_FailedValue));
                this.Result = new TestResult_js_1.TestResult(matcherResult, this.Performance.getCountMS(), this.Description, errorString, this.StartAt, false, null);
                this.resolveTestResult(this.Result);
                return this.Result;
            }
            catch (err) {
                this.Result = new TestResult_js_1.TestResult(false, 0, this.Description, 'test failed', this.StartAt, true, err.message);
                this.resolveTestResult(this.Result);
                return this.Result;
            }
        });
    }
}
exports.AsyncMatcherProxy = AsyncMatcherProxy;
