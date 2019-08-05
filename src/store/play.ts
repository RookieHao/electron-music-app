/** @format */

import {observable, action} from 'mobx'

export class Play {
  @observable activeMusic: string = ''
  @observable activeMusicPlayStatus: string = 'paused'

  @action setActiveMusic(musicId: string) {
    this.activeMusic = musicId
  }
  @action setActiveMusicPlayStatus(status: string) {
    this.activeMusicPlayStatus = status
  }
}

export default new Play()
