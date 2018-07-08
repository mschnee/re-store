import { Iterable, List, Map } from 'immutable';
import { Action as ReduxAction } from 'redux';

export interface MapState<Type> extends Map<string, any> {
    toJS(): Type;
    get<K extends keyof Type>(key: string): Type[K];
    set<K extends keyof Type, V extends Type[K]>(key: string, value: V);
}

export interface IterableState<Type> extends Iterable<keyof Type, any> {
    toJS(): Type;
    get<K extends keyof Type>(key: K): Type[K];
    set<K extends keyof Type, V extends Type[K]>(key: K, value: V);
}

export interface Action extends ReduxAction {
    payload: any;
}
