/** @format */

import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {PlayStore} from '@store/mobx'
import {AudioPlayer} from '@components/audio-player'
import {Icon, Slider} from 'antd'
import {fomatterTime} from '@utils/utils'
import PlayerStyle from './player.scss'

@observer
class Player extends Component<{}, {percent: number}> {
  audioEle: AudioPlayer | null = null

  constructor(props: {}) {
    super(props)
    this.state = {
      percent: 0,
    }
  }

  onPrev = () => {
    this.audioEle && this.audioEle.pause()
    this.setState({percent: 0})
    PlayStore.onPrev()
  }

  onNext = () => {
    this.audioEle && this.audioEle.pause()
    this.setState({percent: 0})
    PlayStore.onNext()
  }

  onPlay = () => {
    PlayStore.changeStatus(true)
  }

  onPause = () => {
    PlayStore.changeStatus(false)
  }

  onListen = (currentTime: number) => {
    this.setState({percent: currentTime})
    console.log(currentTime)
  }

  changeStatus = () => {
    if (this.audioEle && PlayStore.playerId) {
      PlayStore.playerStatus ? this.audioEle.pause() : this.audioEle.play()
    }
  }

  sliderOnChange = (v: number) => {
    console.log(v)
    if (this.audioEle) {
      this.audioEle.setPlayNodeTime((PlayStore.playingInfoDetail.dt * v) / 100)
    }
  }

  render() {
    return (
      <div className={PlayerStyle['player-controller']}>
        <AudioPlayer
          key={PlayStore.playerId || 0}
          ref={ref => (this.audioEle = ref)}
          loop
          autoPlay
          onPlay={this.onPlay}
          onPause={this.onPause}
          onListen={this.onListen}>
          {PlayStore.playingResources.map(item => (
            <source key={item.url} src={item.url} type={'audio/' + item.type} />
          ))}
        </AudioPlayer>
        <div className={PlayerStyle['change-control']}>
          <div className={PlayerStyle['control-item']} title="上一首" onClick={this.onPrev}>
            <Icon type="step-backward" />
          </div>
          <div className={PlayerStyle['control-item']} onClick={this.changeStatus}>
            {PlayStore.playerStatus ? <Icon type="pause" /> : <Icon type="caret-right" />}
          </div>
          <div className={PlayerStyle['control-item']} title="下一首" onClick={this.onNext}>
            <Icon type="step-forward" />
          </div>
        </div>
        <div className={PlayerStyle['progress-control']}>
          <div className={PlayerStyle.time}>{fomatterTime(this.state.percent * 1000) || '00:00'}</div>
          <div className={PlayerStyle.progress}>
            <Slider
              defaultValue={0}
              value={(((this.state.percent * 1000) / PlayStore.playingInfoDetail.dt) * 100) | 0}
              onChange={(v: any) => this.sliderOnChange(v)}
            />
          </div>
          <div className={PlayerStyle.totalTime}>{fomatterTime(PlayStore.playingInfoDetail.dt)}</div>
          <div className={PlayerStyle['volume-control']}>
            <Icon type="sound" />
          </div>
        </div>
        {/* <div><Progress percent={this.state.percent}></Progress></div> */}
      </div>
    )
  }
}

export default Player
