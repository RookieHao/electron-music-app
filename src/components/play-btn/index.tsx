/** @format */

import React, {Component} from 'react'
import {Spin} from 'antd'
import SvgIcon from '@components/svgIcon'
import PLAY_BTN from './index.scss'
import {PlayStore} from '@store/mobx'
import {PlaylistType} from '@declaration/music-list'
interface BtnProps {
  className?: string
  type?: 'single' | 'list'
  id: number
}

export default class PlayBtn extends Component<BtnProps, {result: PlaylistType}> {
  static defaultProps = {type: 'list'}
  constructor(props: BtnProps) {
    super(props)
    this.state = {
      result: PlayStore.initData,
    }
  }

  async componentDidMount() {
    try {
      let {playlist} = ((await PlayStore.getPlayListDetail(this.props.id)) as unknown) as ResultList
      this.setState({result: playlist})
    } catch (error) {
      console.error(error)
    }
  }

  btnClick = async () => {
    if (this.props.id !== PlayStore.playList.id) {
      PlayStore.setPlayList(this.state.result)
      PlayStore.setPlayMusic(this.state.result.trackIds[0].id, 0)
    }
  }

  render() {
    let {tracks} = this.state.result
    return (
      <div className={`${PLAY_BTN['play-btn']} ${this.props.className}`}>
        {tracks && tracks.length ? (
          <div className={PLAY_BTN['btn']} onClick={this.btnClick}>
            {/* <Icon type="play-circle" theme="outlined" /> */}
            <SvgIcon iconName="play"></SvgIcon>
          </div>
        ) : (
          <Spin size="small" />
        )}
      </div>
    )
  }
}

interface ResultList {
  code: number
  playlist: PlaylistType
  privileges: any[]
}
