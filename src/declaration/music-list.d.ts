/** @format */

export type arItemType = {
  id: number
  name: string
}
export interface MusicInfoType {
  name: string
  id: number
  ar: arItemType[]
  dt: number
} // 歌曲列表中，歌曲信息type

export type trackId = {
  id: number
  v: number
  alg: any
}

export type PlaylistType = {
  id: number // 歌单id
  subscribers: subscribersitem[]
  subscribed: boolean
  name: string
  description: string // 歌单描述
  trackIds: trackId[] // 歌单歌曲列表Id
  tracks: MusicInfoType[] // 歌单歌曲列表
}

export type subscribersitem = {
  defaultAvatar: boolean
  province: number
  authStatus: number
  followed: boolean
  avatarUrl: string
  accountStatus: number
  gender: number
  city: number
  birthday: number
  userId: number
  userType: number
  nickname: string
  signature: string
  description: string
  detailDescription: string
  avatarImgId: number
  backgroundImgId: number
  backgroundUrl: string
  authority: number
  mutual: false
  expertTags?: string
  experts?: string
  djStatus: number
  vipType: number
  remarkName?: string
  avatarImgIdStr: string
  backgroundImgIdStr: string
  avatarImgId_str: string
}

export type musicResourceType = musicDetaiType[]

type musicDetaiType = {
  url: string
  type: string
  md5?: string
}
