/** @format */

import {observable, action} from 'mobx'

export class LayOutType {
  @observable isMaximized = false
  @action setMaximized(isMaximized: boolean) {
    this.isMaximized = isMaximized
  }
}

export default new LayOutType()
