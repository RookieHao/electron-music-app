/** @format */

import React, {Component} from 'react'
import LazyLoad from '@utils/lazyLoad'
import DigitalStyle from './index.scss'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {Tabs} from 'antd'
const {TabPane} = Tabs

const TabPanes = [
  {
    name: 'SpecialRecommend',
    tab: '个性推荐',
    component: LazyLoad(() => import(/* webpackChunkName:"specialRecommend" */ './components/specialRecommend')),
  },
  {
    name: 'SongList',
    tab: '歌单',
    component: LazyLoad(() => import(/* webpackChunkName:"songlist" */ './components/songList')),
  },
  {
    name: 'AnchorRadio',
    tab: '主播电台',
    component: LazyLoad(() => import(/* webpackChunkName:"anchorRadio" */ './components/anchorRadio')),
  },
  {
    name: 'Leaderboard',
    tab: '排行榜',
    component: LazyLoad(() => import(/* webpackChunkName:"leaderboard" */ './components/leaderboard')),
  },
  {
    name: 'SingerList',
    tab: '歌手',
    component: LazyLoad(() => import(/* webpackChunkName:"singerList" */ './components/singerList')),
  },
  {
    name: 'LatestMusic',
    tab: '最新音乐',
    component: LazyLoad(() => import(/* webpackChunkName:"latestMusic" */ './components/latestMusic')),
  },
]

interface StateType {
  activeKey: string
}

export default withRouter(
  class DigitalMusic extends Component<RouteComponentProps, StateType> {
    constructor(props: RouteComponentProps) {
      super(props)
      this.state = {
        activeKey: 'SpecialRecommend',
      }
    }

    componentWillReceiveProps({match}: any) {
      this.setState({
        activeKey: match.params.activeKey,
      })
    }

    onTabClick = (activeKey: string) => {
      this.props.history.push(activeKey)
    }
    render() {
      return (
        <div className={DigitalStyle['digital-music']}>
          <Tabs animated={false} activeKey={this.state.activeKey} onTabClick={this.onTabClick}>
            {TabPanes.map(tabPane => (
              <TabPane tab={tabPane.tab} key={tabPane.name}>
                <tabPane.component {...this.state}></tabPane.component>
              </TabPane>
            ))}
          </Tabs>
        </div>
      )
    }
  },
)
