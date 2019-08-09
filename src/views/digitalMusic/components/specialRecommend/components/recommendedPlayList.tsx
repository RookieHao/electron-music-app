/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'

import ElectronCard from '@components/electronCard'
import SvgIcon from '@components/svgIcon'
import RecommendedApi from '@api/digital.music.recommended'
import RecommendedStyle from '../index.scss'
import PlayBtn from '@components/play-btn'
import {ResultItem, ResultList} from '@declaration/recommendedPlayList'

export interface IAppProps extends RouteComponentProps {
  title: string
}
export interface IAppState {
  ResultList: ResultItem[]
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
        let {result: ResultList} = ((await RecommendedApi.getPersonalized()) as unknown) as ResultList
        this.setState({ResultList})
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
            <PlayBtn className={RecommendedStyle['item-play-btn']} type="list" id={item.id}></PlayBtn>
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
  },
)
