/** @format */

import React from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'

import Routers, {RouteType} from './router.config'

export function generateRoute(route: RouteType, key: number) {
  if (route.redirect) {
    return <Route path={route.path} key={key} exact render={() => <Redirect to={route.redirect} />} />
  } else if (!route.path || route.path === '*') {
    return <Route component={route.component} key={key}></Route>
  } else if (route.children) {
    return <route.component key={key} {...{generateRoute, routes: route.children}}></route.component>
  } else {
    return <Route exact path={route.path} key={key} component={route.component}></Route>
  }
}

export default function EXportRouter() {
  console.log(Routers.map((r, i) => generateRoute(r, i)))
  return (
    <HashRouter>
      {/* <Switch> */}
      {Routers.map((r, i) => generateRoute(r, i))}
      {/* </Switch> */}
    </HashRouter>
  )
}
