import { Map as ImmutableMap } from 'immutable';

import { default as BaseReducer } from '../../../reducer';

import Reducer from '../../Reducer/Reducer';

export const DOUBLE = Symbol('Double The Value');

export interface TestReducerState {
    num: number;
}

export default class TestReducer extends BaseReducer<TestReducerState> {
    @Reducer('increment')
    public increment(state: any, payload: any) {
        if (!state || !state.has('num')) {
            return ImmutableMap({
                num: 1
            });
        } else {
            return state.set('num', state.get('num') +1);
        }
    }

    @Reducer('decrement')
    public decrement(state: any, payload: any) {
        if (!state || !state.has('num')) {
            return ImmutableMap({
                num: 1
            });
        } else {
            return state.set('num', state.get('num') - 1);
        }
    }

    @Reducer(DOUBLE)
    public double(state: any, payload: any) {
        if (!state || !state.has('num')) {
            return ImmutableMap({
                num: 2
            });
        } else {
            return state.set('num', state.get('num') * 2);
        }
    }
}