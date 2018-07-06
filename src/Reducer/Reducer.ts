import { Map } from 'immutable';
import { Reducer as ReduxReducer } from 'redux';

import Store from '../Store';
import { Action, IterableState } from '../types';

export declare type ReducerFn<S> = (state: IterableState<S>, payload: any) => IterableState<S>;

export default class Reducer<StateType> {
    public name: string;
    protected store: Store;

    private reducerMethods: {
        [key: string]: ReducerFn<StateType>;
    };

    constructor(name: string, store: Store) {
        Object.defineProperty(this, 'name', {
            value: name,
            writable: false,
        });
        this.store = store;
    }

    public registerReducer(key: string, fn: ReducerFn<StateType>) {
        this.reducerMethods[key] = fn;
    }

    public reduce: ReduxReducer = (previousState: Map<string, Reducer<any>>, action: Action) => {
        if (!previousState.has(this.name) || !this.reducerMethods.hasOwnProperty(action.type)) {
            return previousState;
        } else {
            return previousState.updateIn([this.name], (value: IterableState<StateType>) =>
                this.reducerMethods[action.type](value, action.payload),
            );
        }
    }
}
