import { Map as ImmutableMap } from 'immutable';

import { default as BaseReducer } from '../../../reducer';

import Reducer from '../../Reducer/Reducer';

import DefaultState from '../DefaultState';

@DefaultState({
    num: 10
})
class DefaultStateTestReducer extends BaseReducer<any> {
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

test('A BaseReducer subclass decorated with @DefaultState uses that default state', () => {
    const r = new DefaultStateTestReducer(null);
    const initialState = r.reduce(null, null);
    expect(initialState.get('num')).toBe(10);
    const secondState = r.reduce(initialState, {type: 'increment', payload: null});
    expect(secondState.get('num')).toBe(11);
});