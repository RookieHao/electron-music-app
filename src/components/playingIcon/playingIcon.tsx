/** @format */

import React, {Component, CSSProperties} from 'react'

let step: number = 0
let animation: number = 0
class PlayingIcon extends Component<PlayingIconProps> {
  static defaultProps: PlayingIconProps
  ctxEle: HTMLCanvasElement | null = null
  componentDidMount() {
    if (this.ctxEle) {
      this.ctxEle.width = this.ctxEle.parentElement ? this.ctxEle.parentElement.offsetWidth : 100
      this.ctxEle.height = this.ctxEle.parentElement ? this.ctxEle.parentElement.offsetWidth : 100
      this.drawIcon()
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(animation)
  }

  drawIcon = () => {
    if (this.ctxEle) {
      let ctxEle = this.ctxEle
      let context = ctxEle.getContext('2d')
      if (context && step > 20) {
        step = 0
        context.clearRect(0, 0, ctxEle.width, ctxEle.height)
        this.drawRect(context, ctxEle)
      }
    }
    step += this.randomNumber(5)
    animation = requestAnimationFrame(this.drawIcon)
  }

  drawRect = (context: CanvasRenderingContext2D, ctxEle: HTMLCanvasElement) => {
    let height1 = this.randomNumber(ctxEle.height * 0.8)
    let height2 = this.randomNumber(ctxEle.height * 0.9)
    let height3 = this.randomNumber(ctxEle.height * 0.8)
    context.fillStyle = this.randomColor(this.randomNumber(1, 0.3))
    context.fillRect(ctxEle.width * 0.1, ctxEle.height - height1, ctxEle.width * 0.2, height1)
    context.fillStyle = this.randomColor(this.randomNumber(1, 0.4))
    context.fillRect(ctxEle.width * 0.4, ctxEle.height - height2, ctxEle.width * 0.2, height2)
    context.fillStyle = this.randomColor(this.randomNumber(1, 0.5))
    context.fillRect(ctxEle.width * 0.7, ctxEle.height - height3, ctxEle.width * 0.2, height3)
  }

  randomNumber = (n: number = 20, min: number = 0) => {
    return Math.random() * n + min
  }

  randomColor = (apla: number = 0.5) => {
    let r = this.randomNumber(120, 20) | 0
    let g = this.randomNumber(120, 10) | 0
    let b = this.randomNumber(120, 20) | 0
    return 'rgba(' + r + ',' + g + ',' + b + ',' + apla + ')'
  }

  render() {
    return <canvas ref={ref => (this.ctxEle = ref)} style={this.props.style}></canvas>
  }
}

PlayingIcon.defaultProps = {
  style: {},
}

interface PlayingIconProps {
  style: CSSProperties
}
export default PlayingIcon
