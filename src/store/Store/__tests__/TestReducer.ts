import Reducer from '../../../reducer';

export default class TestReducer extends Reducer<any> {
    constructor(store: any) {
        super(store);

        this.register('TestAction', this.testHandler);
    }

    public testHandler(state: any) {
        return state;
    }

}