import { Map as ImmutableMap } from 'immutable';

import { Reducer, Decorators } from 're-store';


export const DOUBLE = Symbol('Double The Value');

export interface TestReducerState {
    num: number;
}

export default class TestReducer extends Reducer<TestReducerState> {
    @Decorators.Reducer('increment')
    public increment(state: any, payload: any) {
        if (!state || !state.has('num')) {
            return ImmutableMap({
                num: 1
            });
        } else {
            return state.set('num', state.get('num') +1);
        }
    }

    @Decorators.Reducer('decrement')
    public decrement(state: any, payload: any) {
        if (!state || !state.has('num')) {
            return ImmutableMap({
                num: 1
            });
        } else {
            return state.set('num', state.get('num') - 1);
        }
    }

    @Decorators.Reducer(DOUBLE)
    public double(state: any, payload: any) {
        if (!state) {
            return ImmutableMap({
                num: 2
            });
        } else {
            return state.set('num', state.get('num') * 2);
        }
    }
}

async function main() {
    console.log("Starting Test.");

    const r = new TestReducer(null);
    const emptyState = r.reduce(null, null);

    console.log('This should be an empty map:');
    console.log(emptyState.toJS());
    console.log();

    const firstState = r.reduce(null, {type: 'increment', payload: null});

    console.log('This should be { num: 1 }');
    console.log(firstState.toJS());
    console.log();

    const secondState = r.reduce(firstState, {type: 'increment', payload: null});

    console.log('This should be { num: 2 }');
    console.log(secondState.toJS());
    console.log();

    const thirdState = r.reduce(secondState, {type: DOUBLE, payload: null});

    console.log('This should be { num: 4 }');
    console.log(thirdState.toJS());
    console.log();
}

main();