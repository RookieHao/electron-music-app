/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {observer} from 'mobx-react'
import SvgIcon from '@components/svgIcon'
import {PlayStore} from '@store/mobx'
import Player from './player'
import {MusicList} from './musicList'

import AppFooterStyle from '../styles/appFooterPlay.scss'
@observer
class AppFooter extends Component<RouteComponentProps, {showList: boolean}> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      showList: false,
    }
  }

  show = () => {
    this.setState({showList: true})
    document.addEventListener('click', this.hide)
  }

  hide = () => {
    this.setState({showList: false})
    document.removeEventListener('click', this.hide)
  }

  toggle = () => (this.state.showList ? this.hide() : this.show())

  render() {
    let {showList} = this.state
    return (
      <div className={AppFooterStyle['app-footer']}>
        <div className={AppFooterStyle['music-player-controller']}>
          <Player></Player>
        </div>
        <div className={AppFooterStyle['music-list-total']} onClick={this.toggle}>
          <SvgIcon iconName="play-list"></SvgIcon>
          <span className={AppFooterStyle['total-num']}>{PlayStore.playList.tracks.length}</span>
        </div>
        <MusicList showList={showList} close={this.hide}></MusicList>
      </div>
    )
  }
}
export default withRouter(AppFooter)
