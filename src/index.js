import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore , applyMiddleware } from 'redux';

import {BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer  from './reducers/reducers';
import thunk from 'redux-thunk';

let data = []
let store = createStore(reducer,data ,applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
     document.getElementById('root')
);

registerServiceWorker();

if(module.hot){
    module.hot.accept();
}