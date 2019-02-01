import test from 'ava';



test('Simple Reducer with a string key', async (t) => {
    const idm = await import('./IncDecReducer');
    const IncDecReducer = idm.default;
    const INCREMENT = idm.INCREMENT;

    const reducer = new IncDecReducer(null, 5);
    const firstState = reducer.reduce(null, null);
    t.is(firstState.get('num'), 5);

    const secondState = reducer.reduce(firstState, {type: 'DECREMENT', payload: null});
    t.is(secondState.get('num'), 4);
});

test('Simple reducer with a symbol key', async (t) => {
    const idm = await import('./IncDecReducer');
    const IncDecReducer = idm.default;
    const INCREMENT = idm.INCREMENT;

    const reducer = new IncDecReducer(null, 5);
    const firstState = reducer.reduce(null, null);
    t.is(firstState.get('num'), 5);

    const secondState = reducer.reduce(firstState, {type: INCREMENT, payload: null});
    t.is(secondState.get('num'), 6);
})