/** @format */

export interface ResultList {
  code: number
  category: number
  result: ResultItem[]
}
export interface ResultItem {
  alg: string
  artistId: number
  artistName: string
  artists: {id: number; name: string}[]
  canDislike: boolean
  copywriter: string
  duration: number
  id: number
  name: string
  picUrl: string
  playCount: number
  subed: boolean
  type: number
}
