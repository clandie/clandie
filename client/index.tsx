import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppConnectedBindActionCreators } from './App';
import store from './store';
import './stylesheets/styles.scss';

render(
  <Provider store={store}>
    <AppConnectedBindActionCreators />
  </Provider>,
  document.getElementById('root')
);
