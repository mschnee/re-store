import { Map as ImmutableMap } from 'immutable';

import { default as BaseReducer } from '../../../reducer';

import Reducer from '../../Reducer/Reducer';

class ReducerOne extends BaseReducer<any> {
    @Reducer('increment')
    public increment(state: any, payload: any) {
        if (!state || !state.has('num')) {
            return ImmutableMap({
                num: 1
            });
        } else {
            return state.set('num', state.get('num') + 1);
        }
    }
}

class ReducerTwo extends BaseReducer<any> {
    @Reducer('append')
    public append(state: any, payload: any) {
        if (!state || !state.has('val')) {
            return ImmutableMap({
                val: 'a'
            });
        } else {
            return state.set('val', state.get('val') + payload);
        }
    }
}

test('Two BaseReducer subclasses with decoration do not share the decorators', () => {
    const one = new ReducerOne(null);
    const two = new ReducerTwo(null);

    const oneInitialState = one.reduce(null, {type: 'increment', payload: null});
    const twoInitialState = two.reduce(null,  {type: 'append', payload: null});

    expect(oneInitialState.get('num')).toBe(1);
    expect(twoInitialState.get('val')).toBe('a');

    const oneImpossibleState =  one.reduce(null, {type: 'append', payload: null});
    expect(oneImpossibleState).toBeNull();
})