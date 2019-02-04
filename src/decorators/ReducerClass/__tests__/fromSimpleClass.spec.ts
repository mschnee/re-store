import ReducerClass from '../ReducerClass';
import Reducer from '../../Reducer';

import BaseReducer from '../../../reducer';

import { ReducerConstructor } from '../../../types';

interface StateType {
    num: number;
}

@ReducerClass<StateType, any>({
    defaultState: {
        num: 50
    }
})
class SimpleClass {
    public someMember = 'foo';

    @Reducer('increment')
    public increment(state: any, payload: any) {
        return state.set('num', state.get('num') +1);
    }
}

test('A class decorated with @ReducerClass is a reducer.', () => {
    // this sucks:
    const t: SimpleClass & BaseReducer<StateType> = new SimpleClass() as SimpleClass & BaseReducer<StateType>;

    const firstState = t.reduce(null, null);
    expect(firstState.get('num')).toBe(50);

    const secondState = t.reduce(firstState, {type: 'increment', payload: null});
    expect(secondState.get('num')).toBe(51);
})