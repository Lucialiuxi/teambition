import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import {BrowserRouter as Router , Redirect} from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { CookiesProvider } from 'react-cookie';

// let store = createStore(App)

ReactDOM.render(
    <CookiesProvider>
            <Router>
                <App />
            </Router> 
    </CookiesProvider>,
     document.getElementById('root')
);

registerServiceWorker();

//热更新
if(module.hot){
    module.hot.accept();
}