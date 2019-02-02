import { Map as ImmutableMap } from 'immutable';

import { Action, MapState, IStore, IReducer } from '../../types';
import { REDUCER_KEY, DEFAULT_STATE } from '../../types/internal';

declare type  reducerFn<ST> = (state: ST, payload: any) => ST;

export class Reducer<StateType, ST = MapState<StateType>> implements IReducer<StateType, ST> {
    public store: IStore;
    public defaultState: ST;

    private reducerMethods: Map<string | symbol, reducerFn<ST>>;

    /* Only type this - don't set the value, the decorators are applied to this.prototype */
    public [REDUCER_KEY]: Map< string | symbol, reducerFn<ST>>;
    public [DEFAULT_STATE]: ST;

    constructor(store: IStore, defaultState?: ST) {
        this.store = store;
        this.defaultState = defaultState || ImmutableMap({}) as any; // todo: this might be bad :/
        this.reducerMethods = new Map();

        if (this[REDUCER_KEY] && this[REDUCER_KEY].size) {
            this[REDUCER_KEY].forEach((v: reducerFn<ST>, k: string | symbol) => {
                this.register(k, v);
            });
        }
    }

    public register(key: string | symbol, fn: reducerFn<ST>) {
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
