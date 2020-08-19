"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestSuite_1 = require("./TestObjects/TestSuite");
const ts = new TestSuite_1.TestSuite('my first suite');
async function tests() {
    (await ts.addTest('async test').asyncExpect(async () => { return 'lala'; })).equalValue('lala');
    ts.addTest('deep comparison').expect([1, 2, 3]).objectDeepEquals([1, 2, 3]);
    ts.addTest('another deep comparison').expect([1, 2]).objectDeepEquals([1, 2, 3]);
    const results = ts.getAllTestsResults();
    const failed = ts.getFailedTestsResults();
    const passed = ts.getPassedTestsResults();
    console.log('all', results);
    console.log('failed', failed);
    console.log('passed', passed);
}
tests();
