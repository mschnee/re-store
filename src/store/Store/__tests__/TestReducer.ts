import { Map as ImmutableMap } from 'immutable';

import Reducer from '../../../reducer';

export default class TestReducer extends Reducer<any> {
    constructor(store: any) {
        super(store, ImmutableMap({}));

        this.register('TestAction', this.testHandler);
    }

    public testHandler(state: any) {
        return state;
    }

}
