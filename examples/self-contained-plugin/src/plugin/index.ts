import { Types, Decorators } from 're-store';

const { ReducerClass, Reducer } = Decorators;

interface PrivatePluginState {
    fetchInProgress: boolean;
    fetchedOnce: boolean;
    data: string[];
}

const STORE_ID = Symbol('private plugin');
const BEGIN_FETCH = Symbol('private plugin: begin_fetch');
const FETCH_COMPLETE = Symbol('private plugin: fetch_complete');

@ReducerClass<PrivatePluginState, any>({
    defaultState: {
        fetchInProgress: false,
        fetchedOnce: false,
        data: null
    }
})
class PrivateReducer {
    @Reducer(BEGIN_FETCH)
    public beginFetch(state: Types.MapState<PrivatePluginState>) {
        return state.set('fetchInProgress', true);
    }

    @Reducer(FETCH_COMPLETE)
    public fetchComplete(state: Types.MapState<PrivatePluginState>, payload: string[]) {
        return state.merge({
            fetchInProgress: false,
            fetchedOnce: true,
            data: payload
        });
    }
}

// just a bit of stoppage
async function waitForTime(time) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), time)
    });
}

export default class PrivatePlugin {
    private store: Types.IStore;
    constructor(store: Types.IStore) {
        this.store = store;
        this.store.registerReducer(STORE_ID, PrivateReducer);
    }

    public async fetchSomeData() {
        this.store.dispatch(BEGIN_FETCH);

        // pretend we're fetching some data for 1250 ms
        await waitForTime(1250);

        this.store.dispatch(FETCH_COMPLETE, ['foo', 'bar', 'baz', 'bacon']);
    }
}