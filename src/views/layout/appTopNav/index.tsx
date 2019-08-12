/** @format */

import React, {Component} from 'react'
import {remote} from 'electron'

import {Icon} from 'antd'
import Navigation from '@components/navigation'
import TopNavStyle from '../styles/appTopNav.scss'

import {observer} from 'mobx-react'
import {LayOutStore} from '@store/mobx'

const currentWindow = remote.getCurrentWindow()

@observer
export default class TopNav extends Component {
  componentDidMount() {
    this.setIsMaximized()
    currentWindow.addListener('maximize', this.setIsMaximized)
    currentWindow.addListener('unmaximize', this.setIsMaximized)
  }

  componentWillUnmount() {
    currentWindow.removeAllListeners()
  }

  setIsMaximized = () => LayOutStore.setMaximized(currentWindow.isMaximized())

  // 最大化
  maximize = () => currentWindow.maximize()

  // 取消最大化
  unmaximize = () => currentWindow.unmaximize()

  // 最小化
  minimize = () => currentWindow.minimize()

  // 关闭窗口
  closeWindow = () => currentWindow.close()

  render() {
    return (
      <header className={TopNavStyle['top-nav']}>
        <Navigation></Navigation>
        <div className={`operate-btn ${TopNavStyle['window-operate']}`}>
          <Icon type="line" title="最小化" className={TopNavStyle.icon} onClick={() => this.minimize()} />
          {LayOutStore.isMaximized ? (
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
