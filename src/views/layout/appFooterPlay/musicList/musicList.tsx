/** @format */

import React, {Component} from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {observer} from 'mobx-react'
import {PlayStore} from '@store/mobx'
import {Icon, Radio} from 'antd'
import MusicListStyle from './musicList.scss'

interface MusicListProps extends RouteComponentProps {
  showList: boolean
  close: () => void
}

interface MusicListState {
  radioValue: string
}

@observer
class MusicList extends Component<MusicListProps, MusicListState> {
  constructor(props: MusicListProps) {
    super(props)
    this.state = {
      radioValue: 'A',
    }
  }

  radioChange = (e: any) => {
    this.setState({radioValue: e.target.value})
  }

  generatePlayList() {
    if (this.state.radioValue === 'A') {
      return PlayStore.playList.map(item => {
        return <div key={item.id}>{item.name}</div>
      })
    } else {
      return PlayStore.playPrevList.map(item => {
        return <div key={item.id}>{item.name}</div>
      })
    }
  }

  listContentClick = (event: any) => event.nativeEvent.stopImmediatePropagation()

  clearList = () => PlayStore.setPlayList([])

  render() {
    const {showList, close} = this.props
    const {radioValue} = this.state
    return (
      <div>
        {showList && (
          <div className={MusicListStyle['music-list']} onClick={this.listContentClick}>
            <div className={MusicListStyle['list-header']}>
              <div className={MusicListStyle['top-tab']}>
                <div className={MusicListStyle['tab-group']}>
                  <Radio.Group
                    defaultValue="A"
                    buttonStyle="solid"
                    size="small"
                    onChange={this.radioChange}
                    value={radioValue}>
                    <Radio.Button value="A">播放列表</Radio.Button>
                    <Radio.Button value="B">历史记录</Radio.Button>
                  </Radio.Group>
                </div>
                <div className={MusicListStyle['close-btn']} onClick={close}>
                  <Icon type="close"></Icon>
                </div>
              </div>
              <div className={MusicListStyle['operate-area']}>
                <div>总{PlayStore.playList.length}首</div>
                <div>
                  {radioValue === 'A' && (
                    <span className={MusicListStyle['operate-btn']}>
                      <Icon type="folder-add" /> 收藏全部{' '}
                    </span>
                  )}
                  <span className={MusicListStyle['operate-btn']} onClick={this.clearList}>
                    <Icon type="delete" /> 清空{' '}
                  </span>
                </div>
              </div>
            </div>
            <div className={MusicListStyle['list-content']}>{this.generatePlayList()}</div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(MusicList)
