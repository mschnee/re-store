import { Map as ImmutableMap } from 'immutable';
import { createStore as createReduxStore, Reducer as ReduxReducer, Store as ReduxStore } from 'redux';

import { Action, IReducer, IStore, ReducerConstructor } from '@re-store/types';

export interface StoreOptions {
    redux?: ReduxStore;
    preloadState?: any;
    isNode?: boolean;
    isDev?: boolean;
    useRemoteDevtools?: boolean;
}

declare var process: any;
declare var require: any;

function isNode() {
    return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';

}

export default class Store implements IStore {
    private reducerObjects: Map<string | symbol, IReducer<any>> = new Map();
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

    public registerReducer<T>(name: string | symbol, reducerClass: ReducerConstructor<T>) {
        const nReducer = new reducerClass(this);

        if (!this.reducerObjects.has(name)) {
            this.reducerObjects.set(name, nReducer);
        }
    }

    public getState(name?: string | symbol) {
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

    public getReduxStore() {
        return this.reduxStore;
    }

    private createStore(preloadState: any) {
        try {
            const rde = require('redux-devtools-extension');
            const rrd  = require('remote-redux-devtools');
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

    private reduce: ReduxReducer = (previousState: ImmutableMap<string | symbol, IReducer<any>>, action: Action) => {
        const keyIterator = this.reducerObjects.entries();
        let nextState: ImmutableMap<string | symbol, IReducer<any>> = previousState || ImmutableMap();
        let entry = keyIterator.next();

        while (!entry.done) {
            const [key, reducer] = entry.value;
            nextState = nextState.updateIn([key], (v) => reducer.reduce(v, action));
            entry = keyIterator.next();
        }

        return nextState;
    }
}
