import React, { Component } from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import LayOut from '../views/layout'

const DigitalMusic = () => require('@Views/digitalMusic').default;
const FM_Top = () => require('@Views/FmTop').default;
const LOOK_Live = () => require('@Views/lookLive').default;
const Video = () => require('@Views/video').default;
const FriendList = () => require('@Views/friendList').default;
const MUSIClocal = () => require('@Views/musicLocal').default;
const DownloadManager = () => require('@Views/downloadManager').default;

export default class Routers extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <LayOut>
            <Route path="/" exact render={()=> (<Redirect to="/digital-music"></Redirect>)}></Route>
            <Route path="/digital-music" exact component={DigitalMusic()}></Route>
            <Route path="/FM_Top" exact component={FM_Top()}></Route>
            <Route path="/LOOK_Live" exact component={LOOK_Live()}></Route>
            <Route path="/Video" exact component={Video()}></Route>
            <Route path="/FriendList" exact component={FriendList()}></Route>
            <Route path="/MUSIClocal" exact component={MUSIClocal()}></Route>
            <Route path="/DownloadManager" exact component={DownloadManager()}></Route>
          </LayOut>
        </Switch>
      </HashRouter>
    )
  }
}
