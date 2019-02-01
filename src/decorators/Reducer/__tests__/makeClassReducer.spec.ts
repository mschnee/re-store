import test from 'ava';

import TestReducer, { DOUBLE } from './TestReducer';

test('that it works', (t) => {
    t.is(true, true);
    const r = new TestReducer(null);
    const initialState = r.reduce(null, {type: 'increment', payload: null});
    console.log(initialState.toJS());
    console.log(r);
    t.is(initialState.get('num'), 1);
    const secondState = r.reduce(initialState, {type: 'decrement', payload: null});
    t.is(secondState.get('num'), 0);

    const thirdState = r.reduce(initialState, {type: DOUBLE, payload: null});
    t.is(thirdState.get('num'), 2);
});
