import * as expect from 'expect';

import TestReducer, { DOUBLE } from './TestReducer';

test('that it works', () => {
    const r = new TestReducer(null);
    const initialState = r.reduce(null, {type: 'increment', payload: null});
    expect(initialState.get('num')).toBe(1);
    const secondState = r.reduce(initialState, {type: 'decrement', payload: null});
    expect(secondState.get('num')).toBe(0);

    const thirdState = r.reduce(initialState, {type: DOUBLE, payload: null});
    expect(thirdState.get('num')).toBe(2);
});
