import { TestSuite } from "./TestObjects/TestSuite";
import { Test } from "./TestObjects/Test";



const ts = new TestSuite('my first suite');


async function tests(){

      (await ts.addTest('async test').asyncExpect(async ()=>{return 'lala'})).equalValue('lala')
      ts.addTest('deep comparison').expect([1,2,3]).objectDeepEquals([1,2,3]);
      ts.addTest('another deep comparison').expect([1,2]).objectDeepEquals([1,2,3]);
      const results = ts.getAllTestsResults()
      const failed = ts.getFailedTestsResults();
      const passed = ts.getPassedTestsResults();

      console.log('all',results);
      console.log('failed', failed);
      console.log('passed', passed);
}

tests()