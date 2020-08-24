"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSuiteManager = void 0;
var AsyncTestSuite_js_1 = require("./TestObjects/TestSuites/AsyncTestSuite.js");
Object.defineProperty(exports, "AsyncTestSuite", { enumerable: true, get: function () { return AsyncTestSuite_js_1.AsyncTestSuite; } });
const TestSuiteManager_js_1 = require("./TestObjects/TestSuiteManager/TestSuiteManager.js");
const testSuiteManager = new TestSuiteManager_js_1.TestSuiteManager();
exports.testSuiteManager = testSuiteManager;
