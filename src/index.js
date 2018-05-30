// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import reducers from './reducers';
import registerAuthCodeMessageListener from './utils/registerAuthCodeMessageListener';

import './index.css';

let store = createStore(
    reducers,
    applyMiddleware(thunk)
);

registerAuthCodeMessageListener(store);

const rootElement = document.getElementById('root');

if (!rootElement)
    throw new Error('Root container not found. Script might load too fast or you may forget to put it in HTML.');

ReactDOM.render(<App />, rootElement);
