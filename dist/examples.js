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
const index_js_1 = require("./index.js");
function asyncTests() {
    return __awaiter(this, void 0, void 0, function* () {
        const ats = new index_js_1.AsyncTestSuite('my first async test suite !');
        ats.addBeforeEach(() => {
            'random before each function';
        });
        ats.addAfterEach(() => __awaiter(this, void 0, void 0, function* () {
            'random after each function';
        }));
        ats.addTest('should contain 2').expect([1, 2, 3]).toContain(2);
        ats.addTest('should be equal').expect(5).toBe(5);
        ats.addTest('should fail').asyncExpect(() => __awaiter(this, void 0, void 0, function* () {
            /// do some async stuff...
            return 5;
        })).toBe(2);
        ats.addTest('should fail').asyncExpect(() => __awaiter(this, void 0, void 0, function* () {
            throw new Error('i hate errors');
            return 5;
        })).toBe(2);
        const results = yield ats.getAllTestsResults();
        console.log('async test suite results', results);
        const failed = yield ats.getFailedTestsResults();
        console.log('failed', failed);
        const passed = yield ats.getPassedTestsResults();
        console.log('passed', passed);
    });
}
function tests() {
    const ts = new index_js_1.TestSuite('my first test suite!');
    ts.addTest('should be truthy').expect([2]).toBeTruthy();
    ts.addTest('deep object comparison should work').expect([1, 2, 3]).deepObjectEquals([1, 2, 3]);
    const results = ts.getAllTestsResults();
    console.log('sync test suite results', results);
}
tests();
asyncTests();
