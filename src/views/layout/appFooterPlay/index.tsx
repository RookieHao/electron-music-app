/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import PlayBtn from '@components/play-btn'
import {PlayType} from '@store/mobx'
interface AppFooterProps extends RouteComponentProps {
  store: PlayType
}

export default withRouter(
  class index extends Component<AppFooterProps> {
    constructor(props: AppFooterProps) {
      super(props)
    }
    componentDidMount() {
      console.log(this.props.store)
    }
    render() {
      return (
        <div>
          <PlayBtn mid={1381049131}></PlayBtn>{' '}
        </div>
      )
    }
  },
)
