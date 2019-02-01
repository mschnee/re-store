import { Map } from 'immutable';

import Reducer from '../../../reducer';
import { IStore, MapState } from '../../../types';

interface IncDecState {
    num: number;
}

const DEFAULT_STATE: MapState<IncDecState> = Map({
    num: 0,
});

export default class IncDecReducer extends Reducer<IncDecState> {
    constructor(store: IStore) {
        super(store, DEFAULT_STATE);

        this.register('INCREMENT', this.inc);
        this.register('DECREMENT', this.dec);
    }

    public inc(state: MapState<IncDecState>) {
        return state.set('num', state.get('num') + 1);
    }

    public dec(state: MapState<IncDecState>) {
        return state.set('num', state.get('num') - 1);
    }
}
