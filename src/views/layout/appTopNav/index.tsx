/** @format */

import React, {Component} from 'react'
import {remote} from 'electron'
import {inject} from 'mobx-react'

import {Icon} from 'antd'
import Navigation from '@components/navigation'

import TopNavStyle from '../styles/appTopNav.scss'

import {LayOutStoreType} from '@store/layOut'
interface LayOutStoreProps {
  LayOut?: LayOutStoreType
}
const {getCurrentWindow} = remote

const currentWindow = getCurrentWindow()

interface StateTypes {
  isMaximized: boolean
}

@inject('LayOut')
export default class TopNav extends Component<LayOutStoreProps, StateTypes> {
  constructor(props: LayOutStoreProps) {
    super(props)
    this.state = {
      isMaximized: currentWindow.isMaximized(),
    }
  }

  componentWillMount() {
    currentWindow.addListener('maximize', this.setIsMaximized)
    currentWindow.addListener('unmaximize', this.setIsMaximized)
  }

  componentWillUnmount() {
    currentWindow.removeAllListeners()
  }

  setIsMaximized = () => {
    this.props.LayOut && this.props.LayOut.setMaximized(currentWindow.isMaximized())

    this.setState({
      isMaximized: currentWindow.isMaximized(),
    })

    console.log(this.props.LayOut && this.props.LayOut.isMaximized)
  }

  // 最大化
  maximize = () => {
    currentWindow.maximize()
  }

  // 取消最大化
  unmaximize = () => {
    currentWindow.unmaximize()
  }

  // 最小化
  minimize = () => {
    currentWindow.minimize()
  }

  // 关闭窗口
  closeWindow = () => {
    currentWindow.close()
  }

  render() {
    const {isMaximized} = this.state
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
