/** @format */

import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import LayOut from '../views/layout'

import DigitalMusic from '@views/digitalMusic'
import FM_Top from '@views/FmTop'
import LOOK_Live from '@views/lookLive'
import Video from '@views/video'
import FriendList from '@views/friendList'
import MUSIClocal from '@views/musicLocal'
import DownloadManager from '@views/downloadManager'

export default class Routers extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <LayOut>
            <Route path="/" exact render={() => <Redirect to="/digital-music" />} />
            <Route path="/digital-music" exact component={DigitalMusic} />
            <Route path="/FM_Top" exact component={FM_Top} />
            <Route path="/LOOK_Live" exact component={LOOK_Live} />
            <Route path="/Video" exact component={Video} />
            <Route path="/FriendList" exact component={FriendList} />
            <Route path="/MUSIClocal" exact component={MUSIClocal} />
            <Route path="/DownloadManager" exact component={DownloadManager} />
          </LayOut>
        </Switch>
      </HashRouter>
    )
  }
}
