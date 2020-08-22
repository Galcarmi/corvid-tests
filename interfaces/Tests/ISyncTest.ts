import { ITest } from "./ITest.js";
import { IMatcher } from "../Matchers/IMatcher.js";

export interface ISyncTest extends ITest{
    Matcher: IMatcher;

    expect(i_result: any): IMatcher;
}