import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'components/App/App';
import {store} from 'store/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from 'axios';
import {getIDToken} from "./utils/utils";

axios.interceptors.response.use(
  response => {
    console.log('response', JSON.stringify(response))
    return response;
  },
  function(error) {
    const status = error?.response?.status;
    if (status === 400) {
      alert(error.response.data?.data);
    }

      if (status === 401 || status === 403) {
          alert(error.response.data?.message);
      }

    return Promise.reject(error?.response ?? error);
  }
);

const token = getIDToken();
console.log(token);
if (token) {
  localStorage.setItem('token', token);
}

localStorage.setItem('username', 'uporold')
localStorage.setItem('password', 'TEST_PASSWORD')


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline/>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
