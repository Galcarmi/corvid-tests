import {AsyncTestSuite,TestSuite} from './index.js';
import {testSuiteManager} from './index.js'

async function asyncTests(){
    const ats = new AsyncTestSuite('my first async test suite !');

    ats.addBeforeEach(()=>{'random before each function'});
    ats.addAfterEach(async ()=>{'random after each function'})
    ats.addTest('should contain 2').expect([1,2,3]).toContain(2);
    ats.addTest('should be equal').expect(5).toBe(5);
    ats.addTest('should fail').asyncExpect(async ()=>{
        /// do some async stuff...
        return 5
    }).toBe(2);
    ats.addTest('should fail').asyncExpect(async ()=>{
        throw new Error('i hate errors')
        return 5
    }).toBe(2);
    const results = await ats.getAllTestsResults();
    console.log('async test suite results', results);
    const failed = await ats.getFailedTestsResults();
    console.log('failed',failed);
    const passed = await ats.getPassedTestsResults();
    console.log('passed',passed);
}

function tests(){
    const ts = new TestSuite('my first test suite!');
    ts.addTest('should be truthy').expect([2]).toBeTruthy();
    ts.addTest('deep object comparison should work').expect([1,2,3]).deepObjectEquals([1,2,3]);
    const results = ts.getAllTestsResults();
    console.log('sync test suite results',results)
}

async function testManager(){
    const ts = testSuiteManager.addTestSuite('my test suite');
    ts.addTest('new test').expect(5).toBe(5);
    ts.addTest('new test').expect(5).toBe(2);
    const tss = testSuiteManager.addTestSuite('my second test suite');
    tss.addTest('new test').expect(3).toBe(3);
    const results = await testSuiteManager.getAllTestSuitesResults();
    // const resultsG = await testSuiteManager.getAllTestSuitesResultsG();
    for(const result of results){
        console.log(result.TestSuiteDescription,result.TestsResults);
    }
    // console.log(resultsG);
}

// tests();
// asyncTests();

testManager();
