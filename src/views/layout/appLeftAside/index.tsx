/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {Icon} from 'antd'
import addClassName from 'classnames'
import LeftAsideStyle from '../styles/appLeftAside.scss'

interface StateTypes {
  menus: Array<{name: string; key: string; items: Array<{name: string; key: string; icon: string}>}>
  activeItemKey: string
}

class LeftAside extends Component<RouteComponentProps, StateTypes> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      menus: [
        {
          name: '推荐',
          key: 'recommendedBooks',
          items: [
            {
              name: '发现音乐',
              key: '/digital-music/SpecialRecommend',
              icon: 'mail',
            },
            {
              name: '私人FM',
              key: '/FM_Top',
              icon: 'mail',
            },
            {
              name: 'LOOK直播',
              key: '/LOOK_Live',
              icon: 'mail',
            },
            {
              name: '视频',
              key: '/Video/video',
              icon: 'mail',
            },
            {
              name: '朋友',
              key: '/FriendList',
              icon: 'mail',
            },
          ],
        },
        {
          name: '我的音乐',
          key: '_Music',
          items: [
            {
              name: '本地音乐',
              key: '/MUSIClocal',
              icon: 'mail',
            },
            {
              name: '下载管理',
              key: '/DownloadManager',
              icon: 'mail',
            },
          ],
        },
      ],
      activeItemKey: '/digital-music/SpecialRecommend',
    }
  }

  componentWillReceiveProps({location}: RouteComponentProps) {
    if (location && location.pathname.length > 1) {
      this.setState({
        activeItemKey: location.pathname,
      })
    }
  }
  componentDidMount() {
    let {location} = this.props
    if (this.state.activeItemKey !== location.pathname) {
      this.setState({
        activeItemKey: location.pathname,
      })
    }
  }
  menuItemClick = (key: string) => {
    let {location, history} = this.props
    if (location.pathname !== key) {
      history.push(key)
    }
  }

  IsActive = (key: string) => {
    const {activeItemKey} = this.state
    const RegExpActiveName = /^\/([^\/]*)/
    let activeItemKeyEXEC = RegExpActiveName.exec(activeItemKey)
    let ItemKeyEXEC = RegExpActiveName.exec(key)
    return activeItemKeyEXEC && ItemKeyEXEC && activeItemKeyEXEC[1] === ItemKeyEXEC[1]
  }

  generateMenus = () => {
    const {menus} = this.state
    const generateMenuItems: (JSX.Element | JSX.Element[])[] = []

    menus.forEach(menu => {
      generateMenuItems.push(
        <li key={menu.key} className={addClassName(LeftAsideStyle['group-title'])}>
          {menu.name}
        </li>,
      )
      if (menu.items) {
        generateMenuItems.push(
          menu.items.map(item => {
            return (
              <li
                key={item.key}
                className={addClassName({
                  [LeftAsideStyle['menu-item']]: true,
                  [LeftAsideStyle['active-item']]: this.IsActive(item.key),
                  [LeftAsideStyle['menu-item-normal']]: !this.IsActive(item.key),
                })}
                onClick={() => this.menuItemClick(item.key)}>
                <Icon type={item.icon}></Icon>
                <span className={LeftAsideStyle['menu-title']}>{item.name}</span>
              </li>
            )
          }),
        )
      }
    })
    return generateMenuItems
  }

  render() {
    return (
      <aside className={LeftAsideStyle['left-aside']}>
        <div className={LeftAsideStyle['left-aside-top']}>网易云音乐</div>
        <section className={LeftAsideStyle['left-aside-menu']}>
          <ul className={LeftAsideStyle['menu-content']}>{this.generateMenus()}</ul>
        </section>
      </aside>
    )
  }
}

export default withRouter(LeftAside)
