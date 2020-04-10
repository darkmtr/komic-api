import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import ClientProvider from './ClientProvider';

ReactDOM.render(
  <Router>
    <ClientProvider>
      <App />
    </ClientProvider>
  </Router>,
  document.getElementById('root')
);
