/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {observer} from 'mobx-react'

import {MusicList} from './musicList'
import AppFooterStyle from '../styles/appFooterPlay.scss'

@observer
class index extends Component<RouteComponentProps, {showList: boolean}> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      showList: false,
    }
  }

  show = () => {
    this.setState({showList: true})
    document.addEventListener('click', this.hide)
  }
  hide = () => {
    this.setState({showList: false})
    document.removeEventListener('click', this.hide)
  }
  toggle = () => (this.state.showList ? this.hide() : this.show())

  render() {
    let {showList} = this.state
    return (
      <div className={AppFooterStyle['app-footer']}>
        FooterFooterFooterFooterFooterFooter
        <span onClick={this.toggle}>列表</span>
        <MusicList showList={showList} close={this.hide}></MusicList>
      </div>
    )
  }
}
export default withRouter(index)
