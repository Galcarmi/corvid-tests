import { IMatcher } from "./IMatcher";
import {AsyncFunction} from '../types/AsyncFunction'

export interface ITest{

    // //private fields
    // _matcher:IMatcher
    // _description:string;
    // _beforeFunctions :Function[];
    // _afterFunctions :Function[];

    //access modifiers
    Matcher:IMatcher;
    Description:string;
    BeforeFunctions :Function[];
    AfterFunctions :Function[];



    expect(result:any):IMatcher;
    asyncExpect(asyncResult:(AsyncFunction)):Promise<IMatcher>
    addBefore(beforeFunc:Function): ITest;
    addAfter(afterFunc:Function): ITest
    
}
