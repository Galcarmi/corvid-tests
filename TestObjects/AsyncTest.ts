import { ITest } from "../interfaces/ITest";
import { IMatcher } from "../interfaces/IMatcher";
import { AsyncFunction } from "../types/AsyncFunction";
import { IBeforeAfterFunc } from "../interfaces/IBeforeAfterFunc";
import { IDescribable } from "../interfaces/IDescribable";
import { AsyncMatcherProxy } from "./AsyncMatcherProxy";

export class AsyncTest implements ITest, IBeforeAfterFunc, IDescribable {
  private _description: string;
  private _matcher: AsyncMatcherProxy;
  private _beforeFunctions: Function[];
  private _afterFunctions: Function[];

  constructor(
    description: string,
    beforeFunctions: Function[],
    afterFunctions: Function[]
  ) {
    this._description = description;
    this._beforeFunctions = [...beforeFunctions];
    this._afterFunctions = [...afterFunctions];
  }

  get Description(): string {
    return this._description;
  }

  set Description(val: string) {
    this._description = val;
  }

  get Matcher():  AsyncMatcherProxy {
    return this._matcher;
  }

  set Matcher(val: AsyncMatcherProxy) {
    this._matcher = val;
  }

  get BeforeFunctions(): Function[] {
    return this._beforeFunctions;
  }

  set BeforeFunctions(val: Function[]) {
    this._beforeFunctions = val;
  }

  get AfterFunctions(): Function[] {
    return this._afterFunctions;
  }

  set Result(val: Function[]) {
    this._afterFunctions = val;
  }

  public expect(result: any): AsyncMatcherProxy {
    const resultPromiseWrapper = new Promise((res, rej) => {
      res(result);
    });
    this._matcher = new AsyncMatcherProxy(
      resultPromiseWrapper,
      this._beforeFunctions,
      this._afterFunctions,
      this._description
    );

    return this._matcher;
  }

  public asyncExpect(asyncFunction: AsyncFunction): AsyncMatcherProxy {
    this._matcher = new AsyncMatcherProxy(
      asyncFunction(),
      this._beforeFunctions,
      this._afterFunctions,
      this._description
    );

    return this._matcher;
  }

  public addBefore(beforeFunc: Function): ITest {
    this._beforeFunctions.push(beforeFunc);
    return this;
  }
  public addAfter(afterFunc: Function): ITest {
    this._afterFunctions.push(afterFunc);
    return this;
  }
}
