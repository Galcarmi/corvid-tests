import { TestSuite } from "./TestObjects/TestSuite";
import { Test } from "./TestObjects/Test";



const ts = new TestSuite('my first suite');


async function tests(){

      (await ts.addTest('async test').asyncExpect(async ()=>{return 'lala'})).equalValue('lala')
      ts.addTest('deep comparison').expect([1,2,3]).objectDeepEquals([1,2,3]);
      const results = ts.getResults()
      console.log(results);
}

tests()