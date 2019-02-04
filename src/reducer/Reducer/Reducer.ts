import { Map as ImmutableMap } from 'immutable';

import { Action, MapState, IStore, IReducer, ReducerMethod } from '../../types';
import { REDUCER_KEY, DEFAULT_STATE } from '../../types/internal';


export class Reducer<StateType, ST = MapState<StateType>> implements IReducer<StateType, ST> {
    public store: IStore;
    public defaultState: ST;

    private reducerMethods: Map<string | symbol, ReducerMethod<ST>>;

    /* Only type this - don't set the value, the decorators are applied to this.prototype */
    public [REDUCER_KEY]: Map< string | symbol, ReducerMethod<ST>>;
    public [DEFAULT_STATE]: ST;

    constructor(store: IStore, defaultState?: ST) {
        this.store = store;
        this.defaultState = defaultState || null; // todo: this might be bad :/
        this.reducerMethods = new Map();

        if (this[REDUCER_KEY] && this[REDUCER_KEY].size) {
            this[REDUCER_KEY].forEach((v: ReducerMethod<ST>, k: string | symbol) => {
                this.register(k, v);
            });
        }
    }

    public register(key: string | symbol, fn: ReducerMethod<ST>) {
        this.reducerMethods.set(key, fn);
    }

    public reduce(previousState: ST, action: Action) {
        const nextState: ST = previousState || this.defaultState || this[DEFAULT_STATE] || null;
        if (!action || !this.reducerMethods.has(action.type)) {
            return nextState;
        } else {
            return this.reducerMethods.get(action.type)(nextState, action.payload);
        }
    }
}
