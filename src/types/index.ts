import { Map } from 'immutable';
import { Action as ReduxAction, Store as ReduxStore } from 'redux';

export interface MapState<Type> extends Map<string, any> {
    toJS(): Object;
    get<K extends keyof Type>(key: string): Type[K];
    set<K extends keyof Type, V extends Type[K]>(key: string, value: V): this;
}


export interface Action extends ReduxAction {
    type: string | symbol;
    payload: any;
}

export interface IReducer<T, ST = MapState<T>> {
    reduce(previousState: ST, action: Action): ST;
}

export declare type ReducerConstructor<T, ST = MapState<T>> = new<T> (store: IStore, defaultState?: ST) => IReducer<T, ST>;

export declare type DispatchKey = string | symbol;

export interface StoreOptions {
    redux?: ReduxStore;
    preloadState?: any;
    isNode?: boolean;
    isDev?: boolean;
    useRemoteDevtools?: boolean;
}

export interface IStore {
    registerReducer<T>(name: string | symbol, reducerClass: ReducerConstructor<T>): void;
    getState(name?: string): any;
    dispatch(type: DispatchKey, payload?: any): void;
    getReduxStore(): ReduxStore;
}