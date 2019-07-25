import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import CSS from './styles/index.css';
import SCSS from './styles/index.scss';
import LESS from './styles/index.less';
import  './styles/index.global.css';
import './styles/index.global.scss';
import './styles/index.global.less';

interface State{
  time: Date;
}


export default class LayOut extends Component {
  state: State
  timer: any
  constructor(props: Readonly<{}>){
    super(props)
    this.state = {
      time : new Date()
    }
  }
  componentDidMount(){
    this.timer = setInterval(()=>{
      this.setState({
        time :new Date()
      })
    },1000)
  }
  componentWillUnmount(){
    clearInterval(this.timer)
    this.timer = null
  }
  render() {
    let { time } = this.state;
    return ( 
      <div>
        <p className={CSS.css1}>123 { time.toString() } </p>
        <p className={SCSS.scss1}>1789 { time.toString() } </p>
        <p className={LESS.less1}> { time.toString() } </p>
        <p className="global-css1"> { time.toString() } </p>
        <p className="global-less"> { time.toString() } </p>
        <p className="global-scss"> { time.toString() } </p>
        <p className="global-scss"> { process.env.toString() } </p>
        <Link to="/test">to Test</Link>
      </div>
    )
  }
}
