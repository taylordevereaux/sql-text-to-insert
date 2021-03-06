import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Dependencies
// eslint-disable-next-line
import $ from 'jquery';
import '../node_modules/bootstrap/dist/js/bootstrap.js';

// Theme 
import '@tdevereaux_/black-matter-theme/dist/dark-matter-theme.css';
import '@tdevereaux_/black-matter-theme/dist/index.css';
// Additional Styles
import './index.scss';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();