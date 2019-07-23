import React, { Component } from 'react'
import { HashRouter,Route } from 'react-router-dom'
const layOut = () => require('../views/layout').default;

export default class Routers extends Component {
  render() {
    return (
      <HashRouter>
        <Route path="/" exact component={layOut()}></Route>
      </HashRouter>
    )
  }
}
