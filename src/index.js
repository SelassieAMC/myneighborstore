import React from 'react';
import ReactDOM  from 'react-dom';
import './index.css';
import App from './components/App';
import configureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
