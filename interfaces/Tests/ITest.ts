import { IDescribable } from "../Utils/IDescribable";
import { IBeforeAfterFunc } from "../Utils/IBeforeAfterFunc";


export interface ITest extends IDescribable, IBeforeAfterFunc {
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
