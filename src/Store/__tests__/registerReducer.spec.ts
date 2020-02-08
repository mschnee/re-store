/* eslint-disable no-unused-expressions */

import {expect} from 'chai';
import Store from '../Store';
import IncDecReducer from './IncDecReducer';
import TestReducer from './TestReducer';

describe('Store', () => {
  it('Should construct', () => {
    const s = new Store();
    expect(s).to.not.be.undefined;
  });

  it('Should register a TestAction', () => {
    const s = new Store();
    s.registerReducer(TestReducer);
    s.dispatch('TestAction');
    expect(s.getState('test')).to.not.be.undefined;
  });

  it('Should accept two reducers', () => {
    const s = new Store();
    s.registerReducer(TestReducer);
    s.registerReducer(IncDecReducer);
    s.dispatch('TestAction');
    s.dispatch('INCREMENT');
    expect(s.getState('test')).to.not.be.undefined;
    expect(s.getState('incdec').get('num')).to.equal(1);
  });
});
