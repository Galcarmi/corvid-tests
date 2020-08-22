# corvid-tests

# this package is still in development - i will add documentation soon
corvid-tests is a lighweight package for making simple programmatic tests without the cli.


making synchronous tests with testsuite class!
(testsuite tests  & before function & after functions should be synchronous)
```js
import { TestSuite } from 'corvid-tests';
function tests(){
    const ts = new TestSuite('my first test suite!');
    ts.addTest('should be truthy').expect([2]).toBeTruthy();
    ts.addTest('deep object comparison should work').expect([1,2,3]).deepObjectEquals([1,2,3]);
    const results = ts.getAllTestsResults();
    console.log('sync test suite results',results)
}


tests()

////////output////////
sync test suite results [
  TestResult {
    m_StartAt: 2020-08-21T16:35:02.406Z,
    m_Passed: true,
    m_TimePassed: 70.1249999999618,
    m_Description: 'should be truthy'
  },
  TestResult {
    m_StartAt: 2020-08-21T16:35:02.406Z,
    m_Passed: true,
    m_TimePassed: 139.61499999999205,
    m_Description: 'deep object comparison should work'
  }
]
////////////////

```


making asynchronous tests with AsyncTestSuite class
(tests & before & after functions can be synchronous or asynchronous)



```js
import { AsyncTestSuite } from 'corvid-tests';

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

////////output////////
async test suite results [
  TestResult {
    m_StartAt: 2020-08-21T16:35:02.413Z,
    m_Passed: true,
    m_TimePassed: 174.11199999997962,
    m_Description: 'should contain 2'
  },
  TestResult {
    m_StartAt: 2020-08-21T16:35:02.413Z,
    m_Passed: true,
    m_TimePassed: 172.08299999998644,
    m_Description: 'should be equal'
  },
  TestResult {
    m_StartAt: 2020-08-21T16:35:02.413Z,
    m_Passed: false,
    m_TimePassed: 169.41100000002507,
    m_Description: 'should fail',
    m_FailedString: 'expected 5, but got 2'
  },
  TestResult {
    m_StartAt: 2020-08-21T16:35:02.413Z,
    m_Passed: false,
    m_TimePassed: 0,
    m_Description: 'should fail',
    m_FailedString: 'test failed',
    m_ErrorDetected: true,
    m_ErrorString: 'i hate errors'
  }
]
failed [
  TestResult {
    m_StartAt: 2020-08-21T16:35:02.413Z,
    m_Passed: false,
    m_TimePassed: 169.41100000002507,
    m_Description: 'should fail',
    m_FailedString: 'expected 5, but got 2'
  },
  TestResult {
    m_StartAt: 2020-08-21T16:35:02.413Z,
    m_Passed: false,
    m_TimePassed: 0,
    m_Description: 'should fail',
    m_FailedString: 'test failed',
    m_ErrorDetected: true,
    m_ErrorString: 'i hate errors'
  }
]
passed [
  TestResult {
    m_StartAt: 2020-08-21T16:35:02.413Z,
    m_Passed: true,
    m_TimePassed: 174.11199999997962,
    m_Description: 'should contain 2'
  },
  TestResult {
    m_StartAt: 2020-08-21T16:35:02.413Z,
    m_Passed: true,
    m_TimePassed: 172.08299999998644,
    m_Description: 'should be equal'
  }
]
////////////////


```