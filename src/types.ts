import { Iterable, List, Map } from 'immutable';
import { Action as ReduxAction } from 'redux';

export interface MapState<Type> extends Map<keyof Type, any> {
    toJs(): Type;
    get<K extends keyof Type>(key: K): Type[K];
    set<K extends keyof Type, V extends Type[K]>(key: K, value: V);
}

export interface ListState<Type> extends List<Type> {

}

export interface IterableState<Type> extends Iterable<keyof Type, any> {
    toJs(): Type;
    get<K extends keyof Type>(key: K): Type[K];
    set<K extends keyof Type, V extends Type[K]>(key: K, value: V);
}

export interface Action extends ReduxAction {
    payload: any;
}
