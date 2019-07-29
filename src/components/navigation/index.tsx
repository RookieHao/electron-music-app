/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'

import {Button} from 'antd'
const ButtonGroup = Button.Group

interface StateTypes {
  historyStack: Array<{}>
}

export default withRouter(
  class index extends Component<RouteComponentProps, StateTypes> {
    constructor(props: RouteComponentProps) {
      super(props)
      this.state = {
        historyStack: [],
      }
    }
    render() {
      return (
        <ButtonGroup>
          <Button type="danger" icon="left" />
          <Button type="danger" icon="right" />
        </ButtonGroup>
      )
    }
  },
)
