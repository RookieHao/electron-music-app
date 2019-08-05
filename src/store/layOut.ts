/** @format */

import {observable, action} from 'mobx'

export interface LayOutStoreType {
  isMaximized: boolean
  setMaximized: (isMaximized: boolean) => void
}

export class LayOutStore {
  @observable isMaximized = false
  @action setMaximized(isMaximized: boolean) {
    this.isMaximized = isMaximized
  }
}

export default new LayOutStore()
