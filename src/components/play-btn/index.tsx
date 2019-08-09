/** @format */

import React, {Component} from 'react'
import {Icon} from 'antd'
import SvgIcon from '@components/svgIcon'
import PLAY_BTN from './index.scss'
import {PlayStore} from '@store/mobx'
import {PlaylistType} from '@declaration/music-list'
interface BtnProps {
  className?: string
  type?: 'single' | 'list'
  id: number
}

export default class index extends Component<BtnProps, {result: PlaylistType}> {
  static defaultProps = {type: 'list'}
  constructor(props: BtnProps) {
    super(props)
    this.state = {
      result: PlayStore.initData,
    }
  }

  async componentDidMount() {
    let {playlist} = ((await PlayStore.getPlayListDetail(this.props.id)) as unknown) as ResultList
    this.setState({result: playlist})
  }

  btnClick = async () => {
    PlayStore.setPlayList(this.state.result)
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
          <Icon type="loading" />
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
