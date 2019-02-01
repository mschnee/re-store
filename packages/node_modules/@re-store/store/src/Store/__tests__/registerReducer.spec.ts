// tslint:disable no-unused-expression
import test from 'ava';

import Store from '../../Store/Store';

import IncDecReducer from './IncDecReducer';
import TestReducer from './TestReducer';

test('Should construct', (t) => {
    const s = new Store();
    t.truthy(s);
});

test('Should register a TestAction', (t) => {
    const s = new Store();
    s.registerReducer('test', TestReducer);
    s.dispatch('TestAction');
    t.truthy(s.getState('test'));
});

test('Should accept two reducers', (t) => {
    const s = new Store();
    s.registerReducer('test', TestReducer);
    s.registerReducer('incdec', IncDecReducer);
    s.dispatch('TestAction');
    s.dispatch('INCREMENT');
    t.truthy(s.getState('test'));
    t.is(s.getState('incdec').get('num'), 1);
});

test('Should accept reducers using a symbol', (t) => {
    const testReducerKey = Symbol('Test Reducer Key');
    const incdecReducerKey = Symbol('Test Reducer Key');
    const s = new Store();
    s.registerReducer(testReducerKey, TestReducer);
    s.registerReducer(incdecReducerKey, IncDecReducer);

    s.dispatch('TestAction');
    s.dispatch('INCREMENT');
    t.truthy(s.getState(testReducerKey));
    t.is(s.getState(incdecReducerKey).get('num'), 1);
});
