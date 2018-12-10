/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Grommet } from 'grommet';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import RootStore from './Stores/root';
import './styles/index.scss';

const root = new RootStore();
const theme = {
  global: {
    font: {
      family: 'Noto Sans KR',
      size: '14px',
      height: '20px',
    },
  },
};

ReactDOM.render(
  <Grommet theme={theme} full>
    <Root root={root} />
  </Grommet>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
