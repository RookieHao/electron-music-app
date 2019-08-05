/** @format */

import React from 'react'
import ReactDOM from 'react-dom'
import {configure} from 'mobx'

import {Provider} from 'mobx-react'
import AppRouter from './router'
import '@assets/iconfont/iconfont.global.css'
import '@assets/.global.scss'

configure({
  enforceActions: 'always',
})

import Stores from './store'

console.log(Stores)
ReactDOM.render(
  <Provider {...Stores}>
    <AppRouter />
  </Provider>,
  document.getElementById('app'),
)

// npm i -D @types/webpack-env 解决module不存在hot属性的问题
if (module.hot) {
  module.hot.accept()
}
