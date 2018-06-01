// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './App';
import reducers from './reducers';
import onStoreReady from './onStoreReady';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

let store = createStore(
    reducers,
    applyMiddleware(thunk)
);

onStoreReady(store);

const rootElement = document.getElementById('root');

if (!rootElement)
    throw new Error('Root container not found. Script might load too fast or you may forget to put it in HTML.');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, rootElement);
