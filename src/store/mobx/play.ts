/** @format */

import {observable, action} from 'mobx'
import {getMusicAudio} from '@api/common'

export class PlayType {
  @observable playerStatus: boolean = false // 播放器状态
  @observable playerId: number = 0 // 当前播放的音乐Id
  @observable playingIndex: number = 0 // 当前播放的音乐在列表playList中的位置
  @observable playList: number[] = [] // 当前播放的音乐列表
  @observable playPrevList: number[] = [] // 上一次播放的音乐列表

  @action setPlayList(PlayList: number[]) {
    this.playList = PlayList
  }

  @action.bound
  setActiveMusicPlayStatus(status: string) {}

  @action async getMusicAudio(id: number) {
    try {
      let MusicInfo = await getMusicAudio(id)
      console.log(MusicInfo)
    } catch (error) {
      console.error(error)
    }
  }
}

export default new PlayType()
