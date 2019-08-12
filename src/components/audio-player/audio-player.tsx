/** @format */

import React, {Component, CSSProperties} from 'react'

class AudioPlayer extends Component<AudioPlayerProps> {
  static defaultProps: AudioPlayerProps
  audioEl: HTMLAudioElement | null = null
  listenTracker: NodeJS.Timer | null = null
  componentDidMount() {
    if (this.audioEl) {
      const audio = this.audioEl

      this.updateVolume(this.props.volume)

      audio.addEventListener('error', e => {
        this.props.onError(e)
      })

      audio.addEventListener('canplay', e => {
        this.props.onCanPlay(e)
      })

      audio.addEventListener('canplaythrough', e => {
        this.props.onCanPlayThrough(e)
      })

      audio.addEventListener('play', e => {
        this.setListenTrack()
        this.props.onPlay(e)
      })

      audio.addEventListener('abort', e => {
        this.clearListenTrack()
        this.props.onAbort(e)
      })

      audio.addEventListener('ended', e => {
        this.clearListenTrack()
        this.props.onEnded(e)
      })

      audio.addEventListener('pause', e => {
        this.clearListenTrack()
        this.props.onPause(e)
      })

      audio.addEventListener('seeked', e => {
        this.props.onSeeked(e)
      })

      audio.addEventListener('loadedmetadata', e => {
        this.props.onLoadedMetadata(e)
      })

      audio.addEventListener('volumechange', e => {
        this.props.onVolumeChanged(e)
      })
    }
  }

  setListenTrack() {
    this.audioEl && this.props.onListen(this.audioEl.currentTime)
    if (!this.listenTracker) {
      const listenInterval = this.props.listenInterval
      this.listenTracker = setInterval(() => {
        this.audioEl && this.props.onListen(this.audioEl.currentTime)
      }, listenInterval)
    }
  }

  updateVolume(volume: number) {
    if (this.audioEl) {
      if (typeof volume === 'number' && volume !== this.audioEl.volume) {
        this.audioEl.volume = volume
      }
    }
  }

  clearListenTrack() {
    if (this.listenTracker) {
      clearInterval(this.listenTracker)
      this.listenTracker = null
    }
  }

  play() {
    this.audioEl && this.audioEl.play()
  }

  pause() {
    this.audioEl && this.audioEl.pause()
  }

  setPlayNodeTime(time: number) {
    this.audioEl && (this.audioEl.currentTime = time)
  }

  render() {
    const incompatibilityMessage = this.props.children || (
      <p>
        Your browser does not support the <code>audio</code> element.
      </p>
    )

    // Set controls to be true by default unless explicity stated otherwise
    const controls = !(this.props.controls === false)

    // Set lockscreen / process audio title on devices
    const title = this.props.title ? this.props.title : this.props.src
    return (
      <audio
        autoPlay={this.props.autoPlay}
        className={this.props.className}
        controls={controls}
        crossOrigin={this.props.crossOrigin}
        id={this.props.id}
        loop={this.props.loop}
        muted={this.props.muted}
        preload={this.props.preload}
        ref={ref => {
          this.audioEl = ref
        }}
        src={this.props.src}
        style={this.props.style}
        title={title}
        controlsList={this.props.controlsList}>
        {incompatibilityMessage}
      </audio>
    )
  }
}

AudioPlayer.defaultProps = {
  autoPlay: false,
  children: null,
  className: '',
  controls: false,
  controlsList: '',
  crossOrigin: undefined,
  id: '',
  listenInterval: 1000,
  loop: false,
  muted: false,
  onAbort: () => {},
  onCanPlay: () => {},
  onCanPlayThrough: () => {},
  onEnded: () => {},
  onError: () => {},
  onListen: () => {},
  onPause: () => {},
  onPlay: () => {},
  onSeeked: () => {},
  onVolumeChanged: () => {},
  onLoadedMetadata: () => {},
  preload: 'metadata',
  src: undefined,
  style: {},
  title: '',
  volume: 0.5,
}

interface AudioPlayerProps {
  autoPlay: boolean
  children: Element | Element[] | JSX.Element | JSX.Element[] | null
  className: string
  controls: boolean
  controlsList: string
  crossOrigin?: string
  id: string
  listenInterval: number
  loop: boolean
  muted: boolean
  onAbort: Function
  onCanPlay: Function
  onCanPlayThrough: Function
  onEnded: Function
  onError: Function
  onListen: Function
  onLoadedMetadata: Function
  onPause: Function
  onPlay: Function
  onSeeked: Function
  onVolumeChanged: Function
  preload: '' | 'none' | 'metadata' | 'auto'
  src?: string // Not required b/c can use <source>
  style: CSSProperties
  title: string
  volume: number
}

export default AudioPlayer
