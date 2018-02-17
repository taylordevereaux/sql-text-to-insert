import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Dependencies
import $ from 'jquery';
import '../node_modules/bootstrap/dist/js/bootstrap.js';

// Theme 
import '@tdevereaux_/black-matter-theme';
// Additional Styles
import './index.css';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();