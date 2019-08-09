/** @format */

import {observable, action} from 'mobx'
import commonAPI from '@api/common'
import {PlaylistType} from '@declaration/music-list'

export class PlayType {
  public initData = {
    id: 0,
    subscribers: [],
    subscribed: false,
    description: '',
    trackIds: [],
    tracks: [],
  }

  @observable playerStatus: boolean = false // 播放器状态
  @observable playerId: number = 0 // 当前播放的音乐Id
  @observable playingIndex: number = 0 // 当前播放的音乐在列表playList中的位置
  @observable playList: PlaylistType = this.initData
  @observable playPrevList: PlaylistType = this.initData

  @action.bound
  async getPlayListDetail(id: number) {
    return await commonAPI.getPlayListDetail(id)
  }

  @action.bound // 设置播放列表
  setPlayList(PlayList: PlaylistType) {
    if (PlayList.id !== this.playList.id) {
      this.playPrevList = new Proxy(this.playList, {})
      this.playList = PlayList
    }
  }

  @action.bound // 清空播放列表
  clearPlayList() {
    this.playList = this.initData
  }

  @action.bound // 清空历史记录
  clearPrevPlayList() {
    this.playPrevList = this.initData
  }

  @action.bound // 获取歌曲详情
  async getMusicDetail<T>(ids: Array<T>) {
    let details = await commonAPI.getMusicDetail(ids.join(','))
    console.log(details)
  }

  @action.bound // 获取音乐URL
  async getMusicAudio(id: number) {
    try {
      let MusicInfo = await commonAPI.getMusicAudio(id)
      console.log(MusicInfo)
    } catch (error) {
      console.error(error)
    }
  }
}
export default new PlayType()
