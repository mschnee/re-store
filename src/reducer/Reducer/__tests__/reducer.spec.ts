import * as expect from 'expect';



test('Simple Reducer with a string key', async () => {
    const idm = await import('./IncDecReducer');
    const IncDecReducer = idm.default;
    const INCREMENT = idm.INCREMENT;

    const reducer = new IncDecReducer(null, 5);
    const firstState = reducer.reduce(null, null);
    expect(firstState.get('num')).toBe(5);

    const secondState = reducer.reduce(firstState, {type: 'DECREMENT', payload: null});
    expect(secondState.get('num')).toBe(4);
});

test('Simple reducer with a symbol key', async () => {
    const idm = await import('./IncDecReducer');
    const IncDecReducer = idm.default;
    const INCREMENT = idm.INCREMENT;

    const reducer = new IncDecReducer(null, 5);
    const firstState = reducer.reduce(null, null);
    expect(firstState.get('num')).toBe(5);

    const secondState = reducer.reduce(firstState, {type: INCREMENT, payload: null});
    expect(secondState.get('num')).toBe(6);
})