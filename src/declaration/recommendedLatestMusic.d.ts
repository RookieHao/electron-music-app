/** @format */

export interface ResponseResult {
  result: ResultItem[]
}
export interface ResultItem {
  alg: string
  canDislike: boolean
  copywriter: StringAllNull
  id: number
  name: string
  picUrl: string
  song: SongItem
  type: number
}

type StringAllNull = string | null
type aliasList = []
type musicType = {name: StringAllNull; id: number; size: number; extension: string; sr: number; [propName: string]: any}

export interface SongItem {
  album: {name: string; id: number; type: string; size: number; picId: number; [propName: string]: any}
  alias: aliasList
  artists: [{}]
  audition: StringAllNull
  bMusic: musicType
  commentThreadId: string
  copyFrom: string
  copyright: number
  copyrightId: number
  crbt: StringAllNull
  dayPlays: number
  disc: string
  duration: number
  exclusive: boolean
  fee: number
  ftype: number
  hMusic: musicType
  hearTime: number
  id: number
  lMusic: musicType
  mMusic: musicType
  mark: number
  mp3Url: StringAllNull
  mvid: number
  name: string
  no: number
  playedNum: number
  popularity: number
  position: number
  privilege: {id: number; fee: number; payed: number; st: number; pl: number; [propName: string]: any}
  ringtone: string
  rtUrl: StringAllNull
  rtUrls: []
  rtype: number
  rurl: StringAllNull
  score: number
  sign: StringAllNull
  starred: boolean
  starredNum: number
  status: number
  transName: StringAllNull
}
