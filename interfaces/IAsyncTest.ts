import { ITest } from "./ITest.js";
import { AsyncFunction } from "../types/AsyncFunction.js";
import { AsyncMatcherProxy } from "../TestObjects/AsyncMatcherProxy.js";

export interface IAsyncTest extends ITest {
  asyncExpect(i_asyncResult: AsyncFunction): AsyncMatcherProxy;
}
