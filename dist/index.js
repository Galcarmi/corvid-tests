"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestSuite_1 = require("./TestObjects/TestSuite");
const ts = new TestSuite_1.TestSuite('my first suite');
async function tests() {
    (await ts.addTest('async test').asyncExpect(async () => { return 'lala'; })).equalValue('lala');
    ts.addTest('deep comparison').expect([1, 2, 3]).objectDeepEquals([1, 2, 3]);
    const results = ts.getResults();
    console.log(results);
}
tests();
