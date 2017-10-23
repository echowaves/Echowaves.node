import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import reduxThunk from 'redux-thunk'


import { createStore, applyMiddleware } from 'redux'

import App from './components/app'
import SigninForm from './components/auth/signinForm'
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        Hello WiSaw
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container')
)

// implement react js client here

if(module.hot) {
  module.hot.accept();
}
