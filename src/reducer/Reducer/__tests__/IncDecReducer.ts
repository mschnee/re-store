import { Map as ImmutableMap } from 'immutable';

import Reducer from '../../';
import { IStore, MapState } from '../../../types';

interface IncDecState {
    num: number;
}

const DEFAULT_STATE: MapState<IncDecState> = ImmutableMap({
    num: 0,
});

export const INCREMENT = Symbol('Increment Symbol');

export default class IncDecReducer extends Reducer<IncDecState> {
    constructor(store: IStore, defaultValue = 0) {
        super(store, ImmutableMap({num: defaultValue}));

        this.register(INCREMENT, this.inc);
        this.register('DECREMENT', this.dec);
    }

    public inc(state: MapState<IncDecState>) {
        return state.set('num', state.get('num') + 1);
    }

    public dec(state: MapState<IncDecState>) {
        return state.set('num', state.get('num') - 1);
    }
}