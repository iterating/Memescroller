import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores/store';
import App from './App'; 

const container = document.getElementById('root');
if (!container) throw new Error('No root element found');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </Provider>
);
