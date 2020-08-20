import { IMatcher } from "./IMatcher";
import { AsyncFunction } from "../types/AsyncFunction";
import { AsyncMatcherProxy } from "../TestObjects/AsyncMatcherProxy";

export interface ITest {
  // //private fields
  // _matcher:IMatcher
  // _description:string;
  // _beforeFunctions :Function[];
  // _afterFunctions :Function[];
  //access modifiers
  Matcher: any;

  expect(i_result: any): any;
  addBefore(beforeFunc: Function): ITest;
  addAfter(afterFunc: Function): ITest;
}
