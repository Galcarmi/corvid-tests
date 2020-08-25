"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./index.js");
const index_js_2 = require("./index.js");
async function asyncTests() {
    const ats = index_js_2.tsm.describe('my first async test suite !');
    ats.addBeforeEach(() => {
        'random before each function';
    });
    ats.addAfterEach(async () => {
        'random after each function';
    });
    ats.it('should contain 2').expect([1, 2, 3]).toContain(2);
    ats.it('should be equal').expect(5).toBe(5);
    ats.it('should fail').expect(async () => {
        /// do some async stuff...
        return 5;
    }).toBe(2);
    ats.it('should fail').expect(async () => {
        throw new Error('i hate errors');
        return 5;
    }).toBe(2);
    const results = await ats.getResults();
    console.log('async test suite results', results);
    const failed = await ats.getFailed();
    console.log('failed', failed);
    const passed = await ats.getPassed();
    console.log('passed', passed);
}
async function tests() {
    const ts = new index_js_1.AsyncTestSuite('my first test suite!');
    ts.it('should be truthy').expect([2]).toBeTruthy();
    ts.it('deep object comparison should work').expect([1, 2, 3]).deepObjectEquals([1, 2, 3]);
    const results = await ts.getResults();
    console.log('sync test suite results', results);
}
async function testManager() {
    const ts = index_js_2.tsm.describe('my test suite');
    ts.it('new test').expect(5).toBe(5);
    ts.it('new test').expect(5).toBe(2);
    const tss = index_js_2.tsm.describe('my second test suite');
    tss.it('new test').expect(3).toBe(3);
    const results = await index_js_2.tsm.getResults();
    for (const result of results) {
        console.log(result.TestSuiteDescription, result.TestsResults);
    }
}
tests();
asyncTests();
testManager();
