# Corvid-tests


corvid-tests is a lighweight package for making simple programmatic tests without the cli.


making synchronous tests with testsuite class!
(testsuite tests  & before function & after functions should be synchronous)
```js
import { TestSuite } from 'corvid-tests';
function tests() {
    const ts = new TestSuite('my first test suite!');
    ts.addTest('should be truthy').expect([2]).toBeTruthy();
    const results = ts.getAllTestsResults();
    console.log('sync test suite results', results);
}

tests()

///output///
sync test suite results [
  TestResult {
    m_StartAt: 2020-08-21T12:40:29.320Z,
    m_Passed: true,
    m_TimePassed: 59.603000000038264, /////ms
    m_Description: 'should be truthy'
  }
]


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
    const results = await ats.getAllTestsResults();
    console.log('async test suite results', results);
    const failed = await ats.getFailedTestsResults();
    console.log('failed',failed);
    const passed = await ats.getPassedTestsResults();
    console.log('passed',passed);
}


///output///


async test suite results [
  TestResult {
    m_StartAt: 2020-08-21T12:40:29.326Z,
    m_Passed: true,
    m_TimePassed: 120.95399999998335,/////ms
    m_Description: 'should contain 2'
  },
  TestResult {
    m_StartAt: 2020-08-21T12:40:29.326Z,
    m_Passed: true,
    m_TimePassed: 113.3750000000191,/////ms
    m_Description: 'should be equal'
  },
  TestResult {
    m_StartAt: 2020-08-21T12:40:29.326Z,
    m_Passed: false,
    m_TimePassed: 110.09699999999611,/////ms
    m_Description: 'should fail',
    m_ErrorString: 'expected 5, but got 2'
  }
]
failed [
  TestResult {
    m_StartAt: 2020-08-21T12:40:29.326Z,
    m_Passed: false,
    m_TimePassed: 110.09699999999611,/////ms
    m_Description: 'should fail',
    m_ErrorString: 'expected 5, but got 2'
  }
]
passed [
  TestResult {
    m_StartAt: 2020-08-21T12:40:29.326Z,
    m_Passed: true,
    m_TimePassed: 120.95399999998335,/////ms
    m_Description: 'should contain 2'
  },
  TestResult {
    m_StartAt: 2020-08-21T12:40:29.326Z,
    m_Passed: true,
    m_TimePassed: 113.3750000000191,/////ms
    m_Description: 'should be equal'
  }
]
```