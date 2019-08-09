/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {observer} from 'mobx-react'
import {MusicList} from './musicList'
import AppFooterStyle from '../styles/appFooterPlay.scss'
import {PlayStore} from '@store/mobx'
@observer
class index extends Component<RouteComponentProps, {showList: boolean}> {
  audioEle: HTMLAudioElement | null = null
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
        <audio
          autoPlay
          key={PlayStore.playerId || 0}
          data-id={PlayStore.playerId}
          ref={ref => (this.audioEle = ref)}
          loop>
          {PlayStore.playingInfo.map(item => (
            <source key={item.url} src={item.url} type={'audio/' + item.type} />
          ))}
        </audio>
        <span onClick={this.toggle}>列表</span>
        <MusicList showList={showList} close={this.hide}></MusicList>
      </div>
    )
  }
}
export default withRouter(index)
