import {Collection} from 'immutable';
import Store from '../Store';
import {Action, MapState} from '../types';

export default class Reducer<StateType, ST = MapState<StateType>> {
  public name: string;
  protected store: Store;
  protected defaultState: ST;

  private reducerMethods: {
    [key: string]: (state: ST, payload: any) => ST;
  } = {};

  constructor(name: string, store: Store, defaultState?: ST) {
    Object.defineProperty(this, 'name', {
      value: name,
      writable: false,
    });
    this.store = store;
    this.defaultState = defaultState || (Collection({}) as any); // todo: this might be bad :/
  }

  public register(key: string, fn: (state: ST, payload: any) => ST) {
    this.reducerMethods[key] = fn;
  }

  public reduce(previousState: ST, action: Action<any>) {
    const nextState: ST = previousState || this.defaultState;
    if (!this.reducerMethods.hasOwnProperty(action.type)) {
      return nextState;
    } else {
      return this.reducerMethods[action.type](nextState, action.payload);
    }
  }
}
