import * as expect from 'expect';

import Store from '../../../store';

import { ReducerClass, Reducer } from '../../../decorators';
import { ReducerConstructor } from '../../../types';

@ReducerClass<any, any>({
    defaultState: {
        num: 25
    }
})
class TestReducer {
    @Reducer('increment')
    public increment(state: any, payload: any) {
        return state.set('num', state.get('num') + 1 );
    }
}

test('Store works with a class decorated with @ReducerClass', () => {
    const s = new Store();
    s.registerReducer('test', TestReducer);
    s.dispatch('increment');
    expect(s.getState('test')).toBeTruthy();
    expect(s.getState('test').get('num')).toBe(26);
});