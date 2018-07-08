import { Map } from 'immutable';
import { createStore as createReduxStore, Reducer as ReduxReducer, Store as ReduxStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { devToolsEnhancer as remoteDevToolsEnhancer } from 'remote-redux-devtools';

import Reducer from '../Reducer';
import { Action } from '../types';

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

declare var process: any;
function isNode() {
    return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';

}

export default class Store {
    private reducerObjects: ReducerObjectMap = {};
    private isNode: boolean;
    private isDev: boolean;
    private useRemoteDevtools: boolean;
    private reduxStore: ReduxStore;

    constructor(options?: StoreOptions) {
        // oop
        this.reduxStore = options && options.redux
            || this.createStore(options && options.preloadState);
        this.isNode = options && options.isNode !== undefined
            ? options.isNode
            : isNode();
        this.isDev = options && options.isDev !== undefined
            ? options.isDev
            : process && process.env && process.env.NODE_ENV === 'development';
        this.useRemoteDevtools = options && !!options.useRemoteDevtools;
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

    private createStore(preloadState: any) {
        if (this.isDev && !this.isNode) {
            const devTools = this.useRemoteDevtools ? remoteDevToolsEnhancer : devToolsEnhancer;
            return createReduxStore(this.reduce, preloadState, devTools({}));
        } else {
            return createReduxStore(this.reduce, preloadState);
        }
    }

    private reduce: ReduxReducer = (previousState: Map<string, Reducer<any>>, action: Action) => {
        return Object.keys(this.reducerObjects).reduce(
            (nextState: Map<string, Reducer<any>>, key: string) => {
                return nextState.updateIn([key], (v) => this.reducerObjects[key].reduce(v, action));
            },
            previousState || Map(),
        );
    }
}
