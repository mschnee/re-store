import { Store } from 're-store';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import App from './App';

export default function load(preloadState) {
    const store = new Store({
        preloadState,
    });

}

global.setup = load;
