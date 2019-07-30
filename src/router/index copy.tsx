/** @format */

import React, {Component, ClassicComponentClass} from 'react'
import {HashRouter, Switch, Route, Redirect, RouteComponentProps} from 'react-router-dom'
import LayOut from '../views/layout'

import DigitalMusic from '@views/digitalMusic'
import FM_Top from '@views/FmTop'
import LOOK_Live from '@views/lookLive'
import Video from '@views/video'
import FriendList from '@views/friendList'
import MUSIClocal from '@views/musicLocal'
import DownloadManager from '@views/downloadManager'
import Test from '@views/test'
export default class Routers extends Component {
  render() {
    return (
      <HashRouter>
        <Route>
          {({history}: RouteComponentProps) => {
            const {pathname} = history.location
            let content: JSX.Element | null = null
            let hasLayOut: boolean = true
            switch (pathname) {
              case '/':
                content = <Redirect to="/digital-music"></Redirect>
                break
              case '/digital-music':
                content = <DigitalMusic></DigitalMusic>
                break
              case '/FM_Top':
                content = <FM_Top></FM_Top>
                break
              case '/LOOK_Live':
                content = <LOOK_Live></LOOK_Live>
                break
              case '/Video':
                content = <Video></Video>
                break
              case '/FriendList':
                content = <FriendList></FriendList>
                break
              case '/MUSIClocal':
                content = <MUSIClocal></MUSIClocal>
                break
              case '/DownloadManager':
                content = <DownloadManager></DownloadManager>
                break
              case '/login':
                hasLayOut = false
                content = <Test></Test>
                break
              default:
                hasLayOut = false
                content = <div>404</div>
                break
            }
            return hasLayOut ? <LayOut>{content}</LayOut> : content
          }}
        </Route>
      </HashRouter>
    )
  }
}
