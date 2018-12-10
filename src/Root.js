import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { hot } from 'react-hot-loader';
import App from './App';

const Root = ({ root }) => (
  <Provider {...root}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>
);

export default hot(module)(Root);
