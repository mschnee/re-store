import { Map as ImmutableMap } from 'immutable';

import { Action, MapState, IStore, IReducer, METADATA } from '@re-store/types';

declare type  reducerFn<ST> = (state: ST, payload: any) => ST;

export class Reducer<StateType, ST = MapState<StateType>> implements IReducer<StateType, ST> {
    public store: IStore;
    public defaultState: ST;

    private reducerMethods: Map<string | symbol, reducerFn<ST>>;
    public [METADATA]: Map< string | symbol, reducerFn<ST>> = new Map();

    constructor(store: IStore, defaultState?: ST) {
        this.store = store;
        this.defaultState = defaultState || ImmutableMap({}) as any; // todo: this might be bad :/
        this.reducerMethods = new Map();

        if (this.hasOwnProperty(METADATA)) {
            this[METADATA].forEach((v: reducerFn<ST>, k: string | symbol) => {
                this.register(k, v);
            });
        }
    }

    public register(key: string | symbol, fn: reducerFn<ST>) {
        this.reducerMethods.set(key, fn);
    }

    public reduce(previousState: ST, action: Action) {
        const nextState: ST = previousState || this.defaultState;
        if (!action || !this.reducerMethods.has(action.type)) {
            return nextState;
        } else {
            return this.reducerMethods.get(action.type)(nextState, action.payload);
        }
    }
}
