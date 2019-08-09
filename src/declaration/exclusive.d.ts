/** @format */

export interface ResultList {
  code: number
  name: string
  result: ResultItem[]
}
export interface ResultItem {
  alg: string
  copywriter: string
  height: number
  id: number
  name: string
  picUrl: string
  sPicUrl: string
  type: number
  url: string
  videoId: string
  width: number
}
