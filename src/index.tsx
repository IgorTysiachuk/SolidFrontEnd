import React from 'react';
import ReactDOM from 'react-dom/client';

import './features/styles/root.scss'
import './features/styles/reset.scss'
import './features/styles/style.scss'

import { BrowserRouter, Route, useNavigate } from 'react-router-dom';
import Router from './Router';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>

);

