import * as expect from 'expect';

// tslint:disable no-unused-expression
import Store from '../../Store/Store';

import IncDecReducer from './IncDecReducer';
import TestReducer from './TestReducer';

test('Should construct', () => {
    const s = new Store();
    expect(s).toBeTruthy();
});

test('Should register a TestAction', () => {
    const s = new Store();
    s.registerReducer('test', TestReducer);
    s.dispatch('TestAction');
    expect(s.getState('test')).toBeTruthy();
});

test('Should accept two reducers', () => {
    const s = new Store();
    s.registerReducer('test', TestReducer);
    s.registerReducer('incdec', IncDecReducer);
    s.dispatch('TestAction');
    s.dispatch('INCREMENT');
    expect(s.getState('test')).toBeTruthy();
    expect(s.getState('incdec').get('num')).toBe(1);
});

test('Should accept reducers using a symbol', () => {
    const testReducerKey = Symbol('Test Reducer Key');
    const incdecReducerKey = Symbol('Test Reducer Key');
    const s = new Store();
    s.registerReducer(testReducerKey, TestReducer);
    s.registerReducer(incdecReducerKey, IncDecReducer);

    s.dispatch('TestAction');
    s.dispatch('INCREMENT');
    expect(s.getState(testReducerKey)).toBeTruthy();
    expect(s.getState(incdecReducerKey).get('num')).toBe(1);
});
