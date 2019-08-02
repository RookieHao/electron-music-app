/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {Icon} from 'antd'
import RecommendedStyle from '../index.scss'
export default withRouter(
  class recommendedCard extends Component<RouteComponentProps & cardInfoProps> {
    render() {
      let {title} = this.props
      return (
        <div className={RecommendedStyle['miko-card']}>
          <div className={RecommendedStyle['card-header']}>
            <div className={RecommendedStyle['card-title']}>{title}</div>
            <div className={RecommendedStyle['card-opter']}>
              更多<Icon type="right"></Icon>{' '}
            </div>
          </div>
          <div className={RecommendedStyle['card-content']}></div>
        </div>
      )
    }
  },
)

interface cardInfoProps {
  title: string
}
