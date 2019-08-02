/** @format */

import React, {Component} from 'react'
import RecommendedStyle from './index.scss'

import Carousel from './components/carousel'
import RecommendedCard from './components/recommendedCard'

export default class index extends Component {
  render() {
    return (
      <div className={RecommendedStyle.special}>
        <Carousel></Carousel>
        <RecommendedCard title="推荐歌单"></RecommendedCard>
      </div>
    )
  }
}
