"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsm = void 0;
var AsyncTestSuite_js_1 = require("./TestObjects/TestSuites/AsyncTestSuite.js");
Object.defineProperty(exports, "AsyncTestSuite", { enumerable: true, get: function () { return AsyncTestSuite_js_1.AsyncTestSuite; } });
const TestSuiteManager_js_1 = require("./TestObjects/TestSuiteManager/TestSuiteManager.js");
const tsm = new TestSuiteManager_js_1.TestSuiteManager();
exports.tsm = tsm;
