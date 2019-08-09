/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import ElectronCard from '@components/electronCard'
import RecommendedApi from '@api/digital.music.recommended'
import RecommendedStyle from '../index.scss'
import {ResultItem, ResultList} from '@declaration/recommendedFM'
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
        let {result: ResultList} = ((await RecommendedApi.getPersonalizedDjprogram()) as unknown) as ResultList
        this.setState({ResultList})
      } catch (error) {
        console.error(error)
      }
    }

    toMore = () => {}

    generateItem = (item: ResultItem) => {
      return (
        <li key={item.id} className={RecommendedStyle['fm-list-item']}>
          <div className={RecommendedStyle['fm-item-img-box']}>
            <img src={item.picUrl} alt="" />
          </div>
          <p className={RecommendedStyle['fm-item-name']}>{item.name}</p>
        </li>
      )
    }

    public render() {
      let {title} = this.props
      let {ResultList} = this.state
      return (
        <ElectronCard card-title={title} toMore={this.toMore}>
          <ul className={RecommendedStyle['fm-list']}>{ResultList.map(this.generateItem)}</ul>
        </ElectronCard>
      )
    }
  },
)
