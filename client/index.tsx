import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import App from './App';
import { AppConnectedBindActionCreators } from './App';
import store from './store';
import './stylesheets/styles.scss';

render(
  <Provider store={store}>
    {/* <App /> */}
    <AppConnectedBindActionCreators />
  </Provider>,
  document.getElementById('root')
);
