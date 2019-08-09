/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import ElectronCard from '@components/electronCard'
import RecommendedApi from '@api/digital.music.recommended'

interface IAppProps extends RouteComponentProps {
  title: string
}
interface IAppState {}

export default withRouter(
  class App extends Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
      super(props)

      this.state = {}
    }

    componentDidMount() {
      this.getPersonalized()
    }
    getPersonalized = async () => {
      try {
        let bannersData = await RecommendedApi.getLookRecommended()
        console.log(bannersData)
      } catch (error) {
        console.error(error)
      }
    }
    toMore = () => {}

    public render() {
      let {title} = this.props
      return <ElectronCard card-title={title} toMore={this.toMore}></ElectronCard>
    }
  },
)
