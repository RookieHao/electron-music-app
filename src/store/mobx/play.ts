/** @format */

import {observable, action, runInAction} from 'mobx'
import commonAPI from '@api/common'
import {PlaylistType, musicResourceType, MusicInfoType} from '@declaration/music-list'

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
  @observable playingResources: musicResourceType = [] // 当前播放音乐的资源
  @observable playingInfoDetail: MusicInfoType = {name: '', id: 0, ar: [], dt: 0} // 当前播放音乐的资源
  @observable playingIndex: number | null = 0 // 当前播放的音乐在列表playList中的位置
  @observable playList: PlaylistType = this.initData
  @observable playPrevList: PlaylistType = this.initData

  @action.bound
  async getPlayListDetail(id: number) {
    return await commonAPI.getPlayListDetail(id)
  }

  @action.bound // 列表双击播放音乐
  async setPlayMusic(playerId: number, playingIndex: number) {
    this.playingIndex = null
    this.playerId = 0
    this.playingResources = []
    this.playingInfoDetail = {name: '', id: 0, ar: [], dt: 0}
    try {
      let {code, data} = ((await this.getMusicAudio(playerId)) as unknown) as {code: number; data: any[]}
      if (code === 200 && data && data.length && data.some(e => e.url)) {
        runInAction(() => {
          this.playingIndex = playingIndex
          this.playerId = playerId
          this.playingResources = data
          this.playingInfoDetail = this.playList.tracks[playingIndex]
        })
      } else {
        playingIndex++
        if (playingIndex < this.playList.tracks.length) {
          this.setPlayMusic(this.playList.tracks[playingIndex].id, playingIndex)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  @action.bound // 获取并设置当前播放的音乐
  async setPlayingInfo(playerId: number) {
    try {
      let {code, data} = ((await this.getMusicAudio(playerId)) as unknown) as {code: number; data: any[]}
      if (code === 200 && data && data.length) {
        runInAction(() => {
          this.playingResources = data
        })
      }
    } catch (error) {
      console.error(error)
    }
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
    this.playingResources = []
    this.playingIndex = null
    this.playerId = 0
    this.playerStatus = false
    this.playingInfoDetail = {name: '', id: 0, ar: [], dt: 0}
  }

  @action.bound // 清空历史记录
  clearPrevPlayList() {
    this.playPrevList = this.initData
  }

  @action.bound
  changeStatus(status: boolean) {
    this.playerStatus = status
  }

  @action.bound // 上一曲
  onPrev() {
    let {tracks} = this.playList
    let index = this.playingIndex
    if (tracks.length) {
      if (typeof index === 'number') {
        if (index > 0) {
          index--
        } else {
          index = tracks.length - 1
        }
      } else {
        index = tracks.length - 1
      }
      this.setPlayMusic(tracks[index].id, index)
    }
  }

  @action.bound // 下一曲
  onNext(mode: 'single' | 'list' | 'loop' | 'random') {
    let {tracks} = this.playList
    if (tracks.length) {
      let index = this.playingIndex
      switch (mode) {
        case 'single':
        case 'list':
          if (typeof index === 'number') {
            index = ++index % tracks.length
            if (index === 0) return
          } else {
            index = 0
          }
          break
        case 'loop':
          if (typeof index === 'number') {
            index = ++index % tracks.length
          } else {
            index = 0
          }
          break
        case 'random':
          index = (Math.random() * tracks.length) | 0
          break
        default:
          index = 0
          break
      }
      index = index || 0
      this.setPlayMusic(tracks[index].id, index)
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
}
export default new PlayType()
