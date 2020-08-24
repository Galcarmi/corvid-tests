import { ITest } from "./ITest.js";
import { AsyncFunction } from "../../types/AsyncFunction.js";
import { AsyncMatcherProxy } from "../../TestObjects/Matchers/AsyncMatcherProxy.js";

export interface IAsyncTest extends ITest {
  Matcher: AsyncMatcherProxy;

  // asyncExpectHandler(i_asyncResult: AsyncFunction): AsyncMatcherProxy;
  // expectHandler(i_result: any): AsyncMatcherProxy;
  expect(i_Input:AsyncFunction|Function|number|string|Object):AsyncMatcherProxy
}
