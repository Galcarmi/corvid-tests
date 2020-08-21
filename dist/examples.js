import { AsyncTestSuite, TestSuite } from './index.js';
async function asyncTests() {
    const ats = new AsyncTestSuite('my first async test suite !');
    ats.addBeforeEach(() => {
        'random before each function';
    });
    ats.addAfterEach(async () => {
        'random after each function';
    });
    ats.addTest('should contain 2').expect([1, 2, 3]).toContain(2);
    ats.addTest('should be equal').expect(5).toBe(5);
    ats.addTest('should fail').asyncExpect(async () => {
        /// do some async things...
        return 5;
    }).toBe(2);
    const results = await ats.getAllTestsResults();
    console.log('async test suite results', results);
    const failed = await ats.getFailedTestsResults();
    console.log('failed', failed);
    const passed = await ats.getPassedTestsResults();
    console.log('passed', passed);
}
function tests() {
    const ts = new TestSuite('my first test suite!');
    ts.addTest('should be truthy').expect([2]).toBeTruthy();
    const results = ts.getAllTestsResults();
    console.log('sync test suite results', results);
}
tests();
asyncTests();
