import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker.js';
import Store from './store.js';

const root = ReactDOM.createRoot(document.getElementById('root')); // Using createRoot
root.render(
    <Store>
        <App />
    </Store>
);

serviceWorker.register();
