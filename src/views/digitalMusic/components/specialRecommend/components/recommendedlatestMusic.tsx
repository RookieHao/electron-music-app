/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import ElectronCard from '@components/electronCard'
import RecommendedApi from '@api/digital.music.recommended'
import RecommendedStyle from '../index.scss'

export interface IAppProps extends RouteComponentProps {
  title: string
}
export interface IAppState {
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
        console.log(resultList)
        this.setState({
          ResultList: [resultList.splice(5), resultList],
        })
      } catch (error) {
        console.error(error)
      }
    }

    toMore = () => {
      this.props.history.push('LatestMusic')
    }

    generateItem = (item: ResultItem) => {
      return (
        <li key={item.id} className={RecommendedStyle['latest-list-item']}>
          <div className={RecommendedStyle['item-img-box']}>
            <img src={item.picUrl} alt="" />
          </div>
          <p className={RecommendedStyle['exclusive-item-name']}>{item.name}</p>
        </li>
      )
    }

    public render() {
      let {title} = this.props
      let {ResultList} = this.state
      return (
        <ElectronCard card-title={title} toMore={this.toMore}>
          <div className={RecommendedStyle['latest-list']}>
            {ResultList.map((group: ResultItem[], index: number) => (
              <ul className={RecommendedStyle['latest-list-group']} key={index}>
                {group.map(this.generateItem)}
              </ul>
            ))}
          </div>
        </ElectronCard>
      )
    }
  },
)

export interface ResponseResult {
  result: ResultItem[]
}
export interface ResultItem {
  alg: string
  canDislike: boolean
  copywriter: StringAllNull
  id: number
  name: string
  picUrl: string
  song: SongItem
  type: number
}

type StringAllNull = string | null
type aliasList = []
type musicType = {name: StringAllNull; id: number; size: number; extension: string; sr: number; [propName: string]: any}

export interface SongItem {
  album: {name: string; id: number; type: string; size: number; picId: number; [propName: string]: any}
  alias: aliasList
  artists: [{}]
  audition: StringAllNull
  bMusic: musicType
  commentThreadId: string
  copyFrom: string
  copyright: number
  copyrightId: number
  crbt: StringAllNull
  dayPlays: number
  disc: string
  duration: number
  exclusive: boolean
  fee: number
  ftype: number
  hMusic: musicType
  hearTime: number
  id: number
  lMusic: musicType
  mMusic: musicType
  mark: number
  mp3Url: StringAllNull
  mvid: number
  name: string
  no: number
  playedNum: number
  popularity: number
  position: number
  privilege: {id: number; fee: number; payed: number; st: number; pl: number; [propName: string]: any}
  ringtone: string
  rtUrl: StringAllNull
  rtUrls: []
  rtype: number
  rurl: StringAllNull
  score: number
  sign: StringAllNull
  starred: boolean
  starredNum: number
  status: number
  transName: StringAllNull
}
