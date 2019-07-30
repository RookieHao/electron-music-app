/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {Icon} from 'antd'
import addClassName from 'classnames'
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
        <div className={addClassName('operate-btn', navigationStyle['btn-group'])}>
          <div
            className={addClassName({
              [navigationStyle.btn]: true,
              [navigationStyle['active-btn']]: activeRouteNumber > 1,
            })}
            onClick={this.goBack}>
            <Icon type="left" />
          </div>
          <div
            className={addClassName({
              [navigationStyle.btn]: true,
              [navigationStyle['active-btn']]: activeRouteNumber < historyLength,
            })}
            onClick={this.goForward}>
            <Icon type="right" />
          </div>
        </div>
      )
    }
  },
)
