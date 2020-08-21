import {AsyncTestSuite} from './index.js';

async function tests(){
    const ats = new AsyncTestSuite('my first async test suite !');

    ats.addTest('should contain 2').expect([1,2,3]).toContain(2);

    const results = await ats.getAllTestsResults();
    console.log(results);
}

tests()