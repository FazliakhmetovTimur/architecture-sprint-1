import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './src/Login';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
