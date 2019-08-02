/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {Icon} from 'antd'
import CardStyle from './index.scss'
export default withRouter(
  class recommendedCard extends Component<RouteComponentProps & cardInfoProps> {
    render() {
      let {title} = this.props
      return (
        <div className={CardStyle['miko-card']}>
          <div className={CardStyle['card-header']}>
            <div className={CardStyle['card-title']}>{title}</div>
            <div className={CardStyle['card-opter']}>
              更多<Icon type="right"></Icon>
            </div>
          </div>
          <div className={CardStyle['card-content']}>{this.props.children}</div>
        </div>
      )
    }
  },
)

interface cardInfoProps {
  title: string
}
