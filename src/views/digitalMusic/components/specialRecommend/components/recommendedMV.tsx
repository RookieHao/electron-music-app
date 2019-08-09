/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import ElectronCard from '@components/electronCard'
import RecommendedApi from '@api/digital.music.recommended'
import {ResultItem, ResultList} from '@declaration/recommendedMV'
import RecommendedStyle from '../index.scss'

interface IAppProps extends RouteComponentProps {
  title: string
}
interface IAppState {
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
        let {result: ResultList} = ((await RecommendedApi.getPpersonalizedMV()) as unknown) as ResultList
        this.setState({ResultList})
      } catch (error) {
        console.error(error)
      }
    }
    toMore = () => {
      this.props.history.push('/Video/mv')
    }

    generateItem = (item: ResultItem) => {
      return (
        <li key={item.id} className={RecommendedStyle['mv-list-item']}>
          <div className={RecommendedStyle['mv-item-img-box']}>
            <img src={item.picUrl} alt="" />
          </div>
          <p className={RecommendedStyle['mv-item-name']}>{item.name}</p>
        </li>
      )
    }

    public render() {
      let {title} = this.props
      let {ResultList} = this.state
      return (
        <ElectronCard card-title={title} toMore={this.toMore}>
          <ul className={RecommendedStyle['mv-list']}>{ResultList.map(this.generateItem)}</ul>
        </ElectronCard>
      )
    }
  },
)
