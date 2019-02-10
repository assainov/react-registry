import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import RegistryApp from './containers/RegistryApp';
import 'bootstrap/dist/css/bootstrap.css';
import reducer from './store/reducer';

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store} >
        <RegistryApp />
    </Provider>, document.getElementById('root'));

