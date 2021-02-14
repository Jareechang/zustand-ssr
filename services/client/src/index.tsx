import React from 'react';
import ReactDOM from 'react-dom';

import Entry from './entry';
import reportWebVitals from './reportWebVitals';

import * as stores from './stores';

import './liveReload'

window.onload = () => {
    Entry.initStore(stores);
}

ReactDOM.render(
    <React.StrictMode>
        <Entry stores={stores} />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
