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

type musicType = {
  bitrate: number
  dfsId: number
  extension: string
  id: number
  name: StringAllNull
  playTime: number
  size: number
  sr: number
  volumeDelta: number
}

export interface artistItem {
  albumSize: number
  alias: []
  briefDesc: string
  id: number
  img1v1Id: number
  img1v1Url: string
  musicSize: number
  name: string
  picId: number
  picUrl: string
  topicPerson: number
  trans: string
}

export interface SongItem {
  album: {
    name: string
    id: number
    type: string
    size: number
    picId: number
    picUrl: string
    [propName: string]: any
    artists: artistItem[]
  }
  alias: aliasList
  artists: artistItem[]
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
