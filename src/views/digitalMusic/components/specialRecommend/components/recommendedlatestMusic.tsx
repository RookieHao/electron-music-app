/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import ElectronCard from '@components/electronCard'
import RecommendedApi from '@api/digital.music.recommended'

export interface IAppProps extends RouteComponentProps {
  title?: string
}

export interface IAppState {}

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
        let bannersData = await RecommendedApi.getPersonalized()
        console.log(bannersData)
      } catch (error) {
        console.error(error)
      }
    }
    public render() {
      return <ElectronCard title="最新音乐"></ElectronCard>
    }
  },
)
