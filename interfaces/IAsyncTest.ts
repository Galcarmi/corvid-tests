import { ITest } from "./ITest";
import { AsyncFunction } from "../types/AsyncFunction";
import { AsyncMatcherProxy } from "../TestObjects/AsyncMatcherProxy";

export interface IAsyncTest extends ITest {
  asyncExpect(i_asyncResult: AsyncFunction): AsyncMatcherProxy;
}
