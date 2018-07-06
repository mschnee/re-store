import Reducer from '../../../Reducer';
import handler from '../handler';

import { expect } from 'chai';

class TestReducer extends Reducer<any> {
    @handler('testAction')
    public someFoo(state) {
        return state;
    }
}

describe('Decorators:handler', () => {
    it('Should work', () => {
        const tr = new TestReducer('testReducer', null);
        expect(true).to.be.true;
    });
});
