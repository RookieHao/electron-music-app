/** @format */

import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {PlayStore} from '@store/mobx'
import {AudioPlayer} from '@components/audio-player'
import {SvgIcon} from '@components/svgIcon'
import {Icon, Slider, Tooltip} from 'antd'
import {fomatterTime} from '@utils/utils'
import PlayerStyle from './player.scss'

type StateType = {
  percent: number
  volume: number
  duration: number
  toolTipVisible: boolean
  playMode: 'list' | 'single' | 'loop' | 'random'
}

const modeType = {
  single: '单曲播放',
  list: '顺序播放',
  loop: '列表循环',
  random: '随机播放',
}
let timer: NodeJS.Timeout | null = null
@observer
class Player extends Component<{}, StateType> {
  audioEle: AudioPlayer | null = null

  constructor(props: {}) {
    super(props)
    this.state = {
      percent: 0,
      duration: 0,
      volume: 50,
      playMode: 'list',
      toolTipVisible: false,
    }
  }

  componentWillUnmount() {
    if (timer) {
      clearTimeout(timer)
      timer = null
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
    PlayStore.onNext(this.state.playMode)
  }

  onPlay = (e: any) => {
    PlayStore.changeStatus(true)
    this.setState({duration: e.target.duration})
  }

  onPause = () => {
    PlayStore.changeStatus(false)
  }

  onEnded = () => {
    this.setState({percent: this.state.duration}, () => this.onNext())
  }

  onAbort = () => {
    this.setState({percent: 0})
  }

  onListen = (currentTime: number) => {
    this.setState({percent: currentTime})
  }

  changeStatus = () => {
    if (this.audioEle && PlayStore.playerId) {
      PlayStore.playerStatus ? this.audioEle.pause() : this.audioEle.play()
    }
  }

  sliderOnChange = (v: number) => {
    if (this.audioEle) {
      this.audioEle.pause()
      this.setState({percent: v})
      this.audioEle.setPlayNodeTime(v)
    }
  }

  sliderOnAfterChange = () => {
    this.audioEle && this.state.duration && this.audioEle.play()
  }

  volumeOnChange = (v: number) => {
    this.setState({
      volume: v,
    })
    this.audioEle && this.audioEle.updateVolume(v / 100)
  }

  changePlayMode = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    this.setState({toolTipVisible: false}, () => {
      switch (this.state.playMode) {
        case 'list':
          this.setState({
            playMode: 'single',
            toolTipVisible: true,
          })
          break
        case 'single':
          this.setState({
            playMode: 'loop',
            toolTipVisible: true,
          })
          break
        case 'loop':
          this.setState({
            playMode: 'random',
            toolTipVisible: true,
          })
          break
        case 'random':
          this.setState({
            playMode: 'list',
            toolTipVisible: true,
          })
          break
      }
    })
    timer = setTimeout(() => {
      if (this.state.toolTipVisible) {
        this.setState({toolTipVisible: false})
      }
    }, 1000)
  }

  render() {
    return (
      <div className={PlayerStyle['player-controller']}>
        <AudioPlayer
          key={PlayStore.playerId || 0}
          ref={ref => (this.audioEle = ref)}
          loop={this.state.playMode === 'single'}
          autoPlay
          onPlay={this.onPlay}
          onPause={this.onPause}
          onEnded={this.onEnded}
          onListen={this.onListen}
          onAbort={this.onAbort}
          onError={this.onNext}>
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
              tooltipVisible={false}
              min={0}
              max={this.state.duration}
              step={0.01}
              value={this.state.percent}
              onChange={(v: any) => this.sliderOnChange(v)}
              onAfterChange={this.sliderOnAfterChange}
            />
          </div>
          <div className={PlayerStyle.totalTime}>{fomatterTime((this.state.duration * 1000) | 0)}</div>
          <div className={PlayerStyle['volume-control']}>
            <Icon type="sound" />
            <div className={PlayerStyle['volume-control-slider']}>
              <Slider
                vertical={true}
                defaultValue={50}
                min={0}
                max={100}
                tooltipPlacement="left"
                value={this.state.volume}
                onChange={(v: any) => this.volumeOnChange(v)}
              />
            </div>
          </div>
          <Tooltip title={modeType[this.state.playMode]} trigger="click" visible={this.state.toolTipVisible}>
            <div
              key={this.state.playMode}
              className={PlayerStyle['play-mode']}
              title={modeType[this.state.playMode]}
              onClick={this.changePlayMode}>
              <SvgIcon iconName={this.state.playMode}></SvgIcon>
            </div>
          </Tooltip>
        </div>
        {/* <div><Progress percent={this.state.percent}></Progress></div> */}
      </div>
    )
  }
}

export default Player
