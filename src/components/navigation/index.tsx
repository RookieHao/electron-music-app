/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {Icon} from 'antd'

import navigationStyle from './index.scss'

interface StateTypes {
  activeRouteNumber: number
  historyLength: number
}

export default withRouter(
  class index extends Component<RouteComponentProps, StateTypes> {
    constructor(props: RouteComponentProps) {
      super(props)
      this.state = {
        activeRouteNumber: 1,
        historyLength: 1,
      }
    }
    componentWillReceiveProps({history}: RouteComponentProps) {
      if (history.action !== 'POP') {
        this.setState({
          historyLength: history.length,
          activeRouteNumber: history.length,
        })
      }
    }

    goBack = () => {
      let {activeRouteNumber} = this.state
      this.setState({
        activeRouteNumber: activeRouteNumber - 1,
      })
      this.props.history.goBack()
    }
    goForward = () => {
      let {activeRouteNumber} = this.state
      this.setState({
        activeRouteNumber: activeRouteNumber + 1,
      })
      this.props.history.goForward()
    }
    render() {
      let {activeRouteNumber, historyLength} = this.state
      return (
        <div className={navigationStyle['btn-group']}>
          <div
            className={navigationStyle.btn + ' ' + (activeRouteNumber > 1 && navigationStyle['active-btn'])}
            onClick={this.goBack}>
            <Icon type="left" />
          </div>
          <div
            className={navigationStyle.btn + ' ' + (activeRouteNumber < historyLength && navigationStyle['active-btn'])}
            onClick={this.goForward}>
            <Icon type="right" />
          </div>
        </div>
      )
    }
  },
)
