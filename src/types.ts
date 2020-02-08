/* eslint-disable @typescript-eslint/no-explicit-any */

import {Collection, Map} from 'immutable';
import {Action as ReduxAction} from 'redux';

export interface MapState<Type> extends Map<string, any> {
  get<K extends keyof Type>(key: string): Type[K];
  set<K extends keyof Type, V extends Type[K]>(key: string, value: V);
}

export interface CollectionState<Type> extends Collection<keyof Type, any> {
  get<K extends keyof Type>(key: K): Type[K];
  set<K extends keyof Type, V extends Type[K]>(key: K, value: V);
}

export interface Action<T> extends ReduxAction {
  payload: T;
}
