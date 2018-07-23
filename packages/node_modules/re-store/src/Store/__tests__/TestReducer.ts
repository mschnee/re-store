import Reducer from '../../Reducer';
import Store from '../../Store';

export default class TestReducer extends Reducer<any> {
    constructor(store: Store) {
        super('test', store);

        this.register('TestAction', this.testHandler);
    }

    public testHandler(state, payload) {
        return state;
    }

}
