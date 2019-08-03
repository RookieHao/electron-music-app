/** @format */

import React, {Component} from 'react'
import RecommendedStyle from './index.scss'
import LazyLoad from '@utils/lazyLoad'

const RecommendedModules = [
  {
    name: 'Banner',
    title: 'Banner',
    component: LazyLoad(() => import(/* webpackChunkName:"banner" */ './components/banner')),
  },
  {
    name: 'RecommendedPlayList',
    title: '推荐歌单',
    component: LazyLoad(() => import(/* webpackChunkName:"songlist" */ './components/recommendedPlayList')),
  },
  {
    name: 'Exclusive',
    title: '独家放送',
    component: LazyLoad(() => import(/* webpackChunkName:"exclusive" */ './components/exclusive')),
  },
  {
    name: 'RecommendedlatestMusic',
    title: '最新音乐',
    component: LazyLoad(() =>
      import(/* webpackChunkName:"recommendedlatestMusic" */ './components/recommendedlatestMusic'),
    ),
  },
  {
    name: 'RecommendedMV',
    title: '推荐MV',
    component: LazyLoad(() => import(/* webpackChunkName:"recommendedMV" */ './components/recommendedMV')),
  },
  {
    name: 'RecommendedFM',
    title: '主播电台',
    component: LazyLoad(() => import(/* webpackChunkName:"recommendedFM" */ './components/recommendedFM')),
  },
  {
    name: 'LookLive',
    title: 'LOOK直播',
    component: LazyLoad(() => import(/* webpackChunkName:"lookLive" */ './components/lookLive')),
  },
]

export default class index extends Component<{}> {
  constructor(props: {}) {
    super(props)
  }
  render() {
    return (
      <div className={RecommendedStyle.special}>
        {RecommendedModules.map(RModule => (
          <RModule.component key={RModule.name} title={RModule.title} {...this.props}></RModule.component>
        ))}
      </div>
    )
  }
}
