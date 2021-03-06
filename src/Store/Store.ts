import {Map} from 'immutable';
import {createStore as createReduxStore, Reducer as ReduxReducer, Store as ReduxStore} from 'redux';
import Reducer from '../Reducer';
import {Action} from '../types';

interface ReducerConstructor<T> {
  new (store: Store): Reducer<T>;
}

interface ReducerObjectMap {
  [name: string]: Reducer<any>;
}

export interface StoreOptions {
  redux?: ReduxStore;
  preloadState?: any;
  isNode?: boolean;
  isDev?: boolean;
  useRemoteDevtools?: boolean;
}

declare let process: any;
declare let require: any;

function isNode() {
  return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
}

export default class Store {
  private reducerObjects: ReducerObjectMap;
  private isNode: boolean;
  private isDev: boolean;
  private useRemoteDevtools: boolean;
  private reduxStore: ReduxStore;
  public reduce: ReduxReducer;

  constructor(options?: StoreOptions) {
    this.reducerObjects = {};
    this.isNode = options?.isNode !== undefined ? options.isNode : isNode();
    this.isDev = options?.isDev !== undefined ? options.isDev : process?.env && process.env.NODE_ENV === 'development';
    this.useRemoteDevtools = options && !!options.useRemoteDevtools;
    this.reduce = this._reduce.bind(this);
    this.reduxStore = options?.redux || this.createStore(options?.preloadState);
  }

  public registerReducer<T>(reducerClass: ReducerConstructor<T>) {
    const nReducer = new reducerClass(this);
    if (!this.reducerObjects.hasOwnProperty(nReducer.name)) {
      this.reducerObjects[nReducer.name] = nReducer;
    }
  }

  public getState(name?: string) {
    if (name) {
      return this.reduxStore.getState().get(name);
    } else {
      return this.reduxStore.getState();
    }
  }

  public dispatch(type: string, payload?: any) {
    this.reduxStore.dispatch({
      payload,
      type,
    });
  }

  private createStore(preloadState: any): ReduxStore {
    try {
      const rde = require('redux-devtools-extension');
      const rrd = require('remote-redux-devtools');
      if (this.isDev && !this.isNode) {
        const devTools = this.useRemoteDevtools ? rrd.devToolsEnhancer : rde.devToolsEnhancer;
        return createReduxStore(this.reduce, preloadState, devTools({}));
      } else {
        return createReduxStore(this.reduce, preloadState);
      }
    } catch (e) {
      return createReduxStore(this.reduce, preloadState);
    }
  }

  private _reduce(previousState: Map<string, Reducer<any>>, action: Action<any>) {
    return Object.keys(this.reducerObjects).reduce((nextState: Map<string, Reducer<any>>, key: string) => {
      return nextState.updateIn([key], v => this.reducerObjects[key].reduce(v, action));
    }, previousState || Map());
  }
}
