/** @format */

export interface ResultList {
  code: number
  result: ResultItem[]
}

export interface ResultItem {
  alg: string
  canDislike: boolean
  copywriter: string
  highQuality: boolean
  id: number
  name: string
  picUrl: string
  playCount: number
  trackCount: number
  type: number
}
