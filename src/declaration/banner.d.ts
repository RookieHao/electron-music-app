/** @format */

export interface BannersResponseData {
  code: number
  banners: bannerItem[]
}

export interface bannerItem {
  encodeId: string
  exclusive: boolean // 独家
  imageUrl: string
  scm: string
  targetId: number
  targetType: number
  titleColor: string
  typeTitle: string
  url: null
  video: null
}
