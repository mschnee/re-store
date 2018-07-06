import { Iterable, Map } from 'immutable';
import { createStore as createReduxStore, Reducer as ReduxReducer, Store as ReduxStore } from 'redux';
import Reducer from '../Reducer';
import { Action, IterableState } from '../types';

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
}

declare var process: any;
function isNode() {
    return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';

}

export default class Store {
    private reducerObjects: ReducerObjectMap = {};
    private isNode: boolean;
    private isDev: boolean;
    private reduxStore: ReduxStore;

    constructor(options: StoreOptions) {
        // oop
        this.reduxStore = options.redux
            || this.createStore(options.preloadState);
        this.isNode = options.isNode !== undefined
            ? options.isNode
            : isNode();
        this.isDev = options.isDev !== undefined
            ? options.isDev
            : process && process.env && process.env.NODE_ENV === 'development';
    }

    public registerReducer<T>(reducerClass: ReducerConstructor<T>) {
        const nReducer = new reducerClass(this);
        if (!this.reducerObjects.hasOwnProperty(nReducer.name)) {
            this.reducerObjects[nReducer.name] = nReducer;
        }
    }

    public getState(name?: string) {
        if (name) {
            this.reduxStore.getState().get(name);
        } else {
            return this.reduxStore.getState();
        }
    }

    private createStore(preloadState: any) {
        return createReduxStore(this.reduce);
    }

    private reduce: ReduxReducer = (previousState: Map<string, Reducer<any>>, action: Action) => {
        return Object.keys(this.reducerObjects).reduce((nextState: Map<string, Reducer<any>>, key: string) => {
            return nextState.updateIn([key], this.reducerObjects[key].reduce);
        }, previousState);
    }
}
