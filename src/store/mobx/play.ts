/** @format */

import {observable, action, runInAction} from 'mobx'
import commonAPI from '@api/common'
import {PlaylistType, musicResourceType} from '@declaration/music-list'

export class PlayType {
  public initData = {
    id: 0,
    name: '',
    subscribers: [],
    subscribed: false,
    description: '',
    trackIds: [],
    tracks: [],
  }

  @observable playerStatus: boolean = false // 播放器状态
  @observable playerId: number | null = null // 当前播放的音乐Id
  @observable playingInfo: musicResourceType = [] // 当前播放的音乐info
  @observable playingIndex: number | null = 0 // 当前播放的音乐在列表playList中的位置
  @observable playList: PlaylistType = this.initData
  @observable playPrevList: PlaylistType = this.initData

  @action.bound
  async getPlayListDetail(id: number) {
    return await commonAPI.getPlayListDetail(id)
  }

  @action.bound // 列表双击播放音乐
  async setPlayMusic(playerId: number, playingIndex: number) {
    try {
      let {code, data} = ((await this.getMusicAudio(playerId)) as unknown) as {code: number; data: any[]}
      if (code === 200 && data && data.length) {
        runInAction(() => {
          this.playingIndex = playingIndex
          this.playerId = playerId
          this.playingInfo = data
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  @action.bound // 设置当前播放的音乐
  setPlayingInfo(Info: musicResourceType) {
    this.playingInfo = Info
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
    this.playingInfo = []
  }

  @action.bound // 清空历史记录
  clearPrevPlayList() {
    this.playPrevList = this.initData
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
}
export default new PlayType()
