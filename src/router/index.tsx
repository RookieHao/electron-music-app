import React, { Component } from 'react'
import { HashRouter,Route } from 'react-router-dom'
const layOut = () => require('@Views/layout').default;
const testIndex = () => require('@Views/test').default;

export default class Routers extends Component {
  render() {
    return (
      <HashRouter>
        <Route path="/" exact component={layOut()}></Route>
        <Route path="/test" exact component={testIndex()}></Route>
      </HashRouter>
    )
  }
}
