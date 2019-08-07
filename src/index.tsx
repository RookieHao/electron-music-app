/** @format */

import React from 'react'
import ReactDOM from 'react-dom'

import AppRouter from './router'
import './icons'
import '@assets/iconfont/iconfont.global.css'
import '@assets/.global.scss'

ReactDOM.render(<AppRouter />, document.getElementById('app'))

// npm i -D @types/webpack-env 解决module不存在hot属性的问题
if (module.hot) {
  module.hot.accept()
}
