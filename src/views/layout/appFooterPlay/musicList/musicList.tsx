/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {observer} from 'mobx-react'
import {PlayStore} from '@store/mobx'
import {PlayingIcon} from '@components/playingIcon'
import {Icon, Radio} from 'antd'
import {PlaylistType, MusicInfoType} from '@declaration/music-list'
import {fomatterTime} from '@utils/utils'
import MusicListStyle from './musicList.scss'

interface MusicListProps extends RouteComponentProps {
  showList: boolean
  close: () => void
}

interface MusicListState {
  radioValue: string
  activeIndex: string | null
}

@observer
class MusicList extends Component<MusicListProps, MusicListState> {
  constructor(props: MusicListProps) {
    super(props)
    this.state = {
      radioValue: 'A',
      activeIndex: 'A1',
    }
  }

  componentWillReceiveProps() {
    if (!this.props.showList) {
      this.setState({
        radioValue: 'A',
      })
    }
  }

  playMusic = (playerId: number, playingIndex: number) => {
    if (playerId !== PlayStore.playerId) {
      PlayStore.setPlayMusic(playerId, playingIndex)
    }
  }

  radioChange = (e: any) => {
    this.setState({radioValue: e.target.value})
  }

  generatePlayList(musicList: PlaylistType) {
    let {activeIndex, radioValue} = this.state
    return musicList.tracks.map((item: MusicInfoType, index: number) => {
      return (
        <div
          key={item.id}
          className={`${MusicListStyle['music-item']} ${
            activeIndex === radioValue + index ? MusicListStyle.activeItem : ''
          }`}
          onClick={() => this.listItemClick(index)}
          onDoubleClick={() => this.playMusic(item.id, index)}>
          {PlayStore.playerId === item.id && (
            <div className={MusicListStyle['playing-icon']}>
              <PlayingIcon />
            </div>
          )}
          <div className={MusicListStyle['music-name']}>{item.name}</div>
          <div className={MusicListStyle['music-author']} title={item.ar.map(ai => ai.name).join('/')}>
            <span>{item.ar.map(ai => ai.name).join('/')}</span>
          </div>
          <div title={musicList.name}>
            <span>
              <Icon type="link" />
            </span>
          </div>
          <div>{fomatterTime(item.dt)}</div>
        </div>
      )
    })
  }

  listContentClick = (event: any) => event.nativeEvent.stopImmediatePropagation()

  listItemClick = (index: number) => {
    this.setState({activeIndex: this.state.radioValue + index})
  }

  clearList = () => {
    let {radioValue} = this.state
    radioValue === 'A' ? PlayStore.clearPlayList() : PlayStore.clearPrevPlayList()
  }

  render() {
    const {showList, close} = this.props
    const {radioValue} = this.state
    let musicList = this.state.radioValue === 'A' ? PlayStore.playList : PlayStore.playPrevList
    let total = musicList.tracks.length
    return (
      <div>
        {showList && (
          <div className={MusicListStyle['music-list']} onClick={this.listContentClick}>
            <div className={MusicListStyle['list-header']}>
              <div className={MusicListStyle['top-tab']}>
                <div className={MusicListStyle['tab-group']}>
                  <Radio.Group
                    defaultValue="A"
                    buttonStyle="solid"
                    size="small"
                    onChange={this.radioChange}
                    value={radioValue}>
                    <Radio.Button value="A">播放列表</Radio.Button>
                    <Radio.Button value="B">历史记录</Radio.Button>
                  </Radio.Group>
                </div>
                <div className={MusicListStyle['close-btn']} onClick={close}>
                  <Icon type="close"></Icon>
                </div>
              </div>
              <div className={MusicListStyle['operate-area']}>
                <div>总{total}首</div>
                <div>
                  {radioValue === 'A' && (
                    <span className={MusicListStyle['operate-btn']}>
                      <Icon type="folder-add" /> 收藏全部
                    </span>
                  )}
                  <span className={MusicListStyle['operate-btn']} onClick={this.clearList}>
                    <Icon type="delete" /> 清空
                  </span>
                </div>
              </div>
            </div>
            <div className={MusicListStyle['list-content']}>{this.generatePlayList(musicList)}</div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(MusicList)
