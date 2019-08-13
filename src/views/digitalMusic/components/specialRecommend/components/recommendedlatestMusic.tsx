/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {PlayStore} from '@store/mobx'
import ElectronCard from '@components/electronCard'
import {PlayBtn} from '@components/playBtn'
import RecommendedApi from '@api/digital.music.recommended'
import {ResultItem, ResponseResult} from '@declaration/recommendedLatestMusic'

import RecommendedStyle from '../index.scss'
interface IAppProps extends RouteComponentProps {
  title: string
}
interface IAppState {
  ResultList: Array<ResultItem[]>
}

export default withRouter(
  class App extends Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
      super(props)

      this.state = {
        ResultList: [],
      }
    }

    componentDidMount() {
      this.getPersonalized()
    }

    getPersonalized = async () => {
      try {
        let {result: resultList} = ((await RecommendedApi.getRecommendedLatestMusic()) as unknown) as ResponseResult
        this.setState({ResultList: [resultList, resultList.splice(5)]})
      } catch (error) {
        console.error(error)
      }
    }
    onClick = (item: ResultItem) => {
      PlayStore.pushToListWithInfo(
        {
          id: item.id,
          name: item.name,
          dt: item.song.duration,
          ar: item.song.artists,
          source: {name: '发现页', path: '/digital-music/SpecialRecommend'},
        },
        true,
      )
    }

    toMore = () => {
      this.props.history.push('LatestMusic')
    }

    generateItem = (item: ResultItem, index: number) => {
      let {album, alias, artists, hMusic} = item.song
      return (
        <li key={hMusic.id} className={RecommendedStyle['latest-list-item']}>
          <div>{index.toString().padStart(2, '0')}</div>
          <div className={RecommendedStyle['latest-item-img-box']}>
            <img src={album.picUrl} alt="" />
            <PlayBtn className={RecommendedStyle['latest-play-btn']} onClick={() => this.onClick(item)}></PlayBtn>
          </div>
          <div>
            <p>
              <span className={RecommendedStyle['color-333']}>{item.name}</span>
              {alias.length ? <span className={RecommendedStyle['color-888']}> {` (${alias.join('/')}) `} </span> : ''}
            </p>
            <p className={RecommendedStyle['color-888']}>{artists.map(e => e.name).join('/')}</p>
          </div>
        </li>
      )
    }

    public render() {
      let {title} = this.props
      let {ResultList} = this.state
      return (
        <ElectronCard card-title={title} toMore={this.toMore}>
          <div className={RecommendedStyle['latest-list']}>
            {ResultList.map((group: ResultItem[], GIndex: number) => (
              <ul className={RecommendedStyle['latest-list-group']} key={GIndex}>
                {group.map((item, index) => this.generateItem(item, GIndex * 5 + index + 1))}
              </ul>
            ))}
          </div>
        </ElectronCard>
      )
    }
  },
)
