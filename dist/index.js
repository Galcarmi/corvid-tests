"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncTestSuite_1 = require("./TestObjects/AsyncTestSuite");
async function tests() {
    //   const ts = new TestSuite('my first suite');
    //   let gal = new Person(25);
    //   (await ts.addTest('async test').asyncExpect(async ()=>{return 'lala'})).equalValue('lala')
    //   ts.addTest('deep comparison').expect([1,2,3]).objectDeepEquals([1,2,3]);
    //   ts.addTest('another deep comparison').expect([1,2]).objectDeepEquals([1,2,3]);
    //   ts.addBeforeEach(()=>{gal.Age = 25})
    //   ts.addTest('gal celebrate birthday').expect(gal.celebrateBirthday()).equalValue(26)
    //   ts.addTest('gal celebrate birthday2').expect(gal.celebrateBirthday()).equalValue(26)
    //   const results = ts.getAllTestsResults()
    //   const failed = ts.getFailedTestsResults();
    //   const passed = ts.getPassedTestsResults();
    //   console.log('all',results);
    //   console.log('failed', failed);
    //   console.log('passed', passed);
    const ats = new AsyncTestSuite_1.AsyncTestSuite('first async test suite');
    ats.addBeforeEach(async () => { console.log('1'); });
    ats.addBeforeEach(async () => { await new Promise((res, rej) => { setTimeout(() => { console.log('2'); res(); }, 3000); }); });
    ats.addBeforeEach(() => { console.log('3'); });
    ats.addAfterEach(async () => { await new Promise((res, rej) => { setTimeout(() => { console.log('4'); res(); }, 3000); }); });
    const result = await ats.addTest('should be true').asyncExpect(async () => { return 5; }).equalValue(5);
    console.log(result);
}
tests();
