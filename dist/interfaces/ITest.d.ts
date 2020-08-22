import { IDescribable } from "./IDescribable";
import { IBeforeAfterFunc } from "./IBeforeAfterFunc";
export interface ITest extends IDescribable, IBeforeAfterFunc {
    Matcher: any;
    expect(i_result: any): any;
    addBefore(beforeFunc: Function): ITest;
    addAfter(afterFunc: Function): ITest;
}
