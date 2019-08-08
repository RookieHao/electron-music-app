/** @format */

import {observable, action} from 'mobx'
import {getMusicAudio, getPlayListDetail} from '@api/common'

export interface MusicInfoType {
  name: string
  id: number
} // 歌曲列表中，歌曲信息type

export class PlayType {
  @observable playerStatus: boolean = false // 播放器状态
  @observable playerId: number = 0 // 当前播放的音乐Id
  @observable playingIndex: number = 0 // 当前播放的音乐在列表playList中的位置
  @observable playList: MusicInfoType[] = [] // 当前播放的音乐列表
  @observable playPrevList: MusicInfoType[] = [] // 上一次播放的音乐列表

  @action.bound
  async getPlayListDetail(id: number) {
    return await getPlayListDetail(id)
  }
  @action.bound
  setPlayList(PlayList: MusicInfoType[]) {
    this.playPrevList = new Proxy(this.playList, {})
    this.playList = PlayList
    console.log(this.playList)
  }

  @action.bound
  setActiveMusicPlayStatus(status: string) {}

  @action.bound
  async getMusicAudio(id: number) {
    try {
      let MusicInfo = await getMusicAudio(id)
      console.log(MusicInfo)
    } catch (error) {
      console.error(error)
    }
  }
}
export default new PlayType()
