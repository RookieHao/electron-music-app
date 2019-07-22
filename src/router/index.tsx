import React, { Component } from 'react'
import { BrowserRouter,Route } from 'react-router-dom'
const layOut = () => require('../views/layout').default;

export default class Routers extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact component={layOut()}></Route>
      </BrowserRouter>
    )
  }
}
