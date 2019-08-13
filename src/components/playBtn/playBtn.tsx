/** @format */

import React, {Component, MouseEvent} from 'react'
import {SvgIcon} from '@components/svgIcon'
import PlayBtnStyle from './playBtn.scss'

interface Props {
  className?: string
  onClick?: (E: MouseEvent) => void
}

export default class PlayBtn extends Component<Props> {
  render() {
    return (
      <div className={`${PlayBtnStyle['play-btn']} ${this.props.className} 1`}>
        <div className={PlayBtnStyle['btn']} onClick={e => this.props.onClick && this.props.onClick(e)}>
          <SvgIcon iconName="play"></SvgIcon>
        </div>
      </div>
    )
  }
}
