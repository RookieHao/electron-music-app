/** @format */

import React, {Component} from 'react'
import {remote} from 'electron'

import {observer} from 'mobx-react'

import {Icon} from 'antd'
import Navigation from '@components/navigation'
import TopNavStyle from '../styles/appTopNav.scss'

import {LayOutType} from '@/store/mobx/index'

const currentWindow = remote.getCurrentWindow()

interface TopNavProps {
  store: LayOutType
}

@observer
export default class TopNav extends Component<TopNavProps> {
  constructor(props: TopNavProps) {
    super(props)
    this.setIsMaximized()
  }

  componentDidMount() {
    currentWindow.addListener('maximize', this.setIsMaximized)
    currentWindow.addListener('unmaximize', this.setIsMaximized)
  }

  componentWillUnmount() {
    currentWindow.removeAllListeners()
  }

  setIsMaximized = () => this.props.store.setMaximized(currentWindow.isMaximized())

  // 最大化
  maximize = () => currentWindow.maximize()

  // 取消最大化
  unmaximize = () => currentWindow.unmaximize()

  // 最小化
  minimize = () => currentWindow.minimize()

  // 关闭窗口
  closeWindow = () => currentWindow.close()

  render() {
    const {isMaximized} = this.props.store
    return (
      <header className={TopNavStyle['top-nav']}>
        <Navigation></Navigation>
        {location.hash}
        <div className={`operate-btn ${TopNavStyle['window-operate']}`}>
          <Icon type="line" title="最小化" className={TopNavStyle.icon} onClick={() => this.minimize()} />
          {isMaximized ? (
            <Icon type="switcher" title="还原" className={TopNavStyle.icon} onClick={() => this.unmaximize()} />
          ) : (
            <Icon type="border" title="最大化" className={TopNavStyle.icon} onClick={() => this.maximize()} />
          )}
          <Icon type="close" title="关闭" className={TopNavStyle.icon} onClick={() => this.closeWindow()} />
        </div>
      </header>
    )
  }
}
