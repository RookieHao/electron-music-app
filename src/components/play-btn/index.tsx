/** @format */

import React, {Component} from 'react'
import {Icon} from 'antd'
import SvgIcon from '@components/svgIcon'
import PLAY_BTN from './index.scss'
import {PlayStore} from '@store/mobx'
interface BtnProps {
  className?: string
  type?: 'single' | 'list'
  id: number
}

export interface MusicInfoType {
  name: string
  id: number
} // 歌曲列表中，歌曲信息type

export default class index extends Component<BtnProps, {result: MusicInfoType[]}> {
  static defaultProps = {type: 'list'}
  constructor(props: BtnProps) {
    super(props)
    this.state = {
      result: [],
    }
  }

  async componentDidMount() {
    let {playlist} = ((await PlayStore.getPlayListDetail(this.props.id)) as unknown) as ResultList
    this.setState({result: playlist.tracks})
  }

  btnClick = async () => {
    PlayStore.setPlayList(this.state.result)
  }

  render() {
    return (
      <div className={`${PLAY_BTN['play-btn']} ${this.props.className}`}>
        {this.state.result && this.state.result.length ? (
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

type PlaylistType = {
  id: number // 歌单id
  description: string // 歌单描述
  trackIds: {id: number; v: number; alg: any}[] // 歌单歌曲列表Id
  tracks: MusicInfoType[] // 歌单歌曲列表
}
