/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import ElectronCard from '@components/electronCard'
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
        this.setState({ResultList: [resultList.splice(5), resultList]})
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
