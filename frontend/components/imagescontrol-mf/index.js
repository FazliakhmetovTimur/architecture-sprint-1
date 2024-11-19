import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ImagesControl from './src';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import { ImagesControl } from './src/ImagesControl';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ImagesControl />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);export default ImagesControl;

