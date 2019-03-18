import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const xhttp = new XMLHttpRequest();
let data = {};
xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        try {
            data = JSON.parse(xhttp.responseText);
        } catch (e) {}
	ReactDOM.render(<App config={data || {}} />, document.getElementById('root'));
    }
};

xhttp.open('GET', `/config.json`, true);
xhttp.send();

registerServiceWorker();
