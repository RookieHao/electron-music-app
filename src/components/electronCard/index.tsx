/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {Icon} from 'antd'
import CardStyle from './index.scss'

export default withRouter(
  class recommendedCard extends Component<cardInfoProps> {
    render() {
      return (
        <div className={CardStyle['miko-card']}>
          <div className={CardStyle['card-header']}>
            <div className={CardStyle['card-title']}>{this.props['card-title']}</div>
            <div className={CardStyle['card-opter']} onClick={this.props.toMore}>
              更多<Icon type="right"></Icon>
            </div>
          </div>
          <div className={CardStyle['card-content']}>{this.props.children}</div>
        </div>
      )
    }
  },
)

interface cardInfoProps extends RouteComponentProps {
  'card-title': string
  toMore: () => void
}
