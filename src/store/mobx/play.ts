/** @format */

import {observable, action, runInAction} from 'mobx'
import {message} from 'antd'
import commonAPI from '@api/common'
import {musicResourceType, MusicInfoType} from '@declaration/music-list'

export class PlayType {
  constructor() {
    this.playPrevList = JSON.parse(localStorage.getItem('playPrevList') || '[]')
  }

  @observable listId: number | null = null
  @observable playerStatus: boolean = false // 播放器状态
  @observable playerId: number | null = null // 当前播放的音乐Id
  @observable playingResources: musicResourceType = [] // 当前播放音乐的资源
  @observable playingIndex: number | null = 0 // 当前播放的音乐在列表playList中的位置
  @observable playList: MusicInfoType[] = []
  @observable playPrevList: MusicInfoType[] = []

  @action.bound // 通过歌单id查询歌曲列表
  async getPlayListDetail(id: number) {
    return await commonAPI.getPlayListDetail(id)
  }

  @action.bound // 设置播放列表
  setPlayList(PlayList: MusicInfoType[], listId: number) {
    if (this.listId !== listId) {
      this.clearPlayList()
      this.listId = listId
      this.playList = PlayList
    }
  }

  @action.bound // 通过id播放音乐
  async setPlayMusicWithId(playerId: number) {
    let _index = this.playList.findIndex(e => e.id === playerId)
    if (_index >= 0) {
      let result = await this.setPlayingInfo(playerId)
      runInAction(() => {
        this.playingIndex = _index
        this.playerId = playerId
        this.pushToHistories(this.playList[_index])
      })
      if (!result) {
        this.setPlayMusicWithIndex(++_index)
      }
    }
    return
  }

  @action.bound // 通过index播放音乐
  async setPlayMusicWithIndex(playIndex: number) {
    if (playIndex >= this.playList.length) {
      message.error('未找到资源')
      return
    }
    let playerId = this.playList[playIndex].id
    let result = await this.setPlayingInfo(playerId)
    runInAction(() => {
      this.playingIndex = playIndex
      this.playerId = playerId
      this.pushToHistories(this.playList[playIndex])
    })
    if (!result) {
      this.setPlayMusicWithIndex(++playIndex)
    }
  }

  @action.bound // 获取并设置当前播放的音乐
  async setPlayingInfo(playerId: number) {
    try {
      let {code, data} = ((await this.getMusicAudio(playerId)) as unknown) as {code: number; data: any[]}
      if (code === 200 && data && data.length && data.some(e => e.url)) {
        runInAction(() => {
          this.playingResources = data
        })
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }

  @action.bound // 加入到历史记录
  pushToHistories(info: MusicInfoType) {
    let has = this.playPrevList.some(e => e.id === info.id)
    if (!has) {
      this.playPrevList.push(info)
      localStorage.setItem('playPrevList', JSON.stringify(this.playPrevList))
    }
  }

  @action.bound // 加入到播放列表--只有歌曲id
  pushToListWithId(playerId: number, params?: Object) {}

  @action.bound // 加入到播放列表--带歌曲信息 isPlay-是否播放
  pushToListWithInfo(playInfo: MusicInfoType, isPlay: boolean = false) {
    let has = this.playList.some(e => e.id === playInfo.id)
    if (!has) {
      let index = typeof this.playingIndex === 'number' ? this.playingIndex : -1
      this.playList.splice(index + 1, 0, playInfo)
    }
    if (isPlay) {
      this.setPlayMusicWithId(playInfo.id)
    }
  }

  // @action.bound // 获取歌曲详情
  // async getMusicDetail<T>(ids: Array<T>) {
  //   let details = await commonAPI.getMusicDetail(ids.join(','))
  //   console.log(details)
  // }

  @action.bound // 获取音乐URL
  async getMusicAudio(id: number) {
    try {
      return await commonAPI.getMusicAudio(id)
    } catch (error) {
      console.error(error)
      return null
    }
  }

  @action.bound
  clearPlayingInfo() {
    // 清除播放信息
    this.playingResources = []
    this.playerStatus = false
    this.playingIndex = null
    this.playerId = 0
  }

  @action.bound // 清空播放列表
  clearPlayList() {
    this.clearPlayingInfo()
    this.listId = null
    this.playList = []
  }

  @action.bound // 清空历史记录
  clearPrevPlayList() {
    this.playPrevList = []
  }

  @action.bound // 改变播放状态 --- 播放/暂停
  changeStatus(status: boolean) {
    this.playerStatus = status
  }

  @action.bound // 上一曲
  onPrev() {
    let index = this.playingIndex
    if (this.playList.length) {
      if (typeof index === 'number') {
        if (index > 0) {
          index--
        } else {
          index = this.playList.length - 1
        }
      } else {
        index = this.playList.length - 1
      }
      this.setPlayMusicWithIndex(index)
    }
  }

  @action.bound // 下一曲
  onNext(mode: 'single' | 'list' | 'loop' | 'random') {
    if (this.playList.length) {
      let index = this.playingIndex
      switch (mode) {
        case 'single':
        case 'list':
          if (typeof index === 'number') {
            index = ++index % this.playList.length
            if (index === 0) return
          } else {
            index = 0
          }
          break
        case 'loop':
          if (typeof index === 'number') {
            index = ++index % this.playList.length
          } else {
            index = 0
          }
          break
        case 'random':
          index = (Math.random() * this.playList.length) | 0
          break
        default:
          index = 0
          break
      }
      index = index || 0
      this.setPlayMusicWithIndex(index)
    }
  }
}
export default new PlayType()
