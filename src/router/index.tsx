/** @format */

import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'

import LazyLoad from '@utils/lazyLoad'
import LayOut from '../views/layout'

const DigitalMusic = LazyLoad(() => import(/* webpackChunkName:"digitalMusic" */ '@views/digitalMusic'))
const FM_Top = LazyLoad(() => import(/* webpackChunkName:"FmTop" */ '@views/FmTop'))
const LOOK_Live = LazyLoad(() => import(/* webpackChunkName:"lookLive" */ '@views/lookLive'))
const Video = LazyLoad(() => import(/* webpackChunkName:"video" */ '@views/video'))
const FriendList = LazyLoad(() => import(/* webpackChunkName:"friendList" */ '@views/friendList'))
const MUSIClocal = LazyLoad(() => import(/* webpackChunkName:"musicLocal" */ '@views/musicLocal'))
const DownloadManager = LazyLoad(() => import(/* webpackChunkName:"downloadManager" */ '@views/downloadManager'))

export default class Routers extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <LayOut>
            <Route path="/" exact render={() => <Redirect to="/digital-music/SpecialRecommend" />} />
            <Route
              path="/digital-music/:activeKey"
              defaultParams={{activeKey: 'SpecialRecommend'}}
              exact
              component={DigitalMusic}
            />
            <Route path="/FM_Top" exact component={FM_Top} />
            <Route path="/LOOK_Live" exact component={LOOK_Live} />
            <Route path="/Video/:type" defaultParams={{activeKey: 'video'}} exact component={Video} />
            <Route path="/FriendList" exact component={FriendList} />
            <Route path="/MUSIClocal" exact component={MUSIClocal} />
            <Route path="/DownloadManager" exact component={DownloadManager} />
          </LayOut>
        </Switch>
      </HashRouter>
    )
  }
}
