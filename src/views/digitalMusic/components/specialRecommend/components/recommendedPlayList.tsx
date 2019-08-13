/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {PlayStore} from '@store/mobx'
import ElectronCard from '@components/electronCard'
import {SvgIcon} from '@components/svgIcon'
import {PlayBtn} from '@/components/playBtn'
import RecommendedApi from '@api/digital.music.recommended'
import RecommendedStyle from '../index.scss'
import {ResultItem, ResultList} from '@declaration/recommendedPlayList'
import {PersonalizeDetail} from '@declaration/music-list'

export interface Props extends RouteComponentProps {
  title: string
}
export interface State {
  ResultList: ResultItem[]
}

class RecommendedList extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ResultList: [],
    }
  }

  componentDidMount() {
    this.getPersonalized()
  }

  // 获取推荐歌单列表
  getPersonalized = async () => {
    try {
      let {result: ResultList} = ((await RecommendedApi.getPersonalized()) as unknown) as ResultList
      this.setState({ResultList})
    } catch (error) {
      console.error(error)
    }
  }

  // 获取歌单详情
  getPersonalizeDetail = async (id: number) => {
    try {
      if (id !== PlayStore.listId) {
        let result = ((await PlayStore.getPlayListDetail(id)) as unknown) as PersonalizeDetail
        let list = result.playlist.tracks.map(e => ({
          ...e,
          source: {name: result.playlist.name, path: '歌单详情页/id'},
        }))
        PlayStore.setPlayList(list, id)
        PlayStore.setPlayMusicWithIndex(0)
      }
    } catch (error) {
      console.error(error)
    }
  }

  toMore = () => {
    this.props.history.push('SongList')
  }

  generateItem = (item: ResultItem) => {
    return (
      <li key={item.id} className={RecommendedStyle['play-list-item']}>
        <div className={RecommendedStyle['item-box']}>
          <div className={RecommendedStyle['item-right-top']}>
            <SvgIcon iconName="headset"></SvgIcon>
            <span>{` ${~~(item.playCount / 10000)}万`}</span>
          </div>
          <div className={RecommendedStyle['item-copywriter']}>
            <span className="line-clamp-ellipsis-2">{item.copywriter}</span>
          </div>
          <img src={item.picUrl} alt="" />
          <PlayBtn
            className={RecommendedStyle['item-play-btn']}
            onClick={() => this.getPersonalizeDetail(item.id)}></PlayBtn>
        </div>
        <p className={`line-clamp-ellipsis-2 ${RecommendedStyle['item-name']}`}>{item.name}</p>
      </li>
    )
  }

  public render() {
    let {title} = this.props
    let {ResultList} = this.state
    return (
      <ElectronCard card-title={title} toMore={this.toMore}>
        <ul className={RecommendedStyle['recommended-play-list']}>{ResultList.map(this.generateItem)}</ul>
      </ElectronCard>
    )
  }
}

export default withRouter(RecommendedList)
