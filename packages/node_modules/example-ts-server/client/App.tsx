import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 're-store';

import ConnectedUi from './Ui';

export interface AppProps {
    store: Store;
}

export default class App extends React.PureComponent {
    public render() {
        return (
            <Provider store={this.props.store.getReduxStore()}>
                <ConnectedUi />
            </Provider>
        );
    }
}
