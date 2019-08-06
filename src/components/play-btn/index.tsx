/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'

import PLAY_BTN from './index.scss'

// enum btnType{
//   'ONLY_PLAY' = 'play', // 播放单曲
//   'PLAY_ALL' = 'all',  // 播放列表
//   'WITH_ROUTER' = 'with_route',
// }

enum btnType {
  ONLY_PLAY, // 播放单曲
  PLAY_ALL, // 播放列表
  WITH_ROUTER,
}

interface BtnProps extends RouteComponentProps {
  type?: number
  mid?: number
  route?: string
}

export default withRouter(
  class index extends Component<BtnProps> {
    static defaultProps = {
      type: 0,
    }
    public type: string

    constructor(props: BtnProps) {
      super(props)
      this.type = btnType[props.type || 0]
    }

    componentDidMount() {}

    btnClick = async () => {}

    render() {
      return (
        <div className={PLAY_BTN['play-btn']}>
          <audio src=""></audio>
          <div className={PLAY_BTN['btn']} onClick={this.btnClick}></div>
        </div>
      )
    }
  },
)
