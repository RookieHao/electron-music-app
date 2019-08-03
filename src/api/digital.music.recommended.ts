/** @format */

import request from '@utils/request'

// 个性推荐 - banner
export function getBanner() {
  return request({
    method: 'GET',
    url: '/banner?type=0',
  })
}

// 个性推荐 - 推荐歌单
export function getPersonalized() {
  return request({
    method: 'GET',
    url: '/personalized',
  })
}

// 个性推荐 - 独家放送
export function getPersonalizedPrivatecontent() {
  return request({
    method: 'GET',
    url: '/personalized/privatecontent',
  })
}

// 个性推荐 - 最新音乐
export function getRecommendedLatestMusic() {
  return request({
    method: 'GET',
    url: '/personalized/newsong',
  })
}

export default {
  getBanner,
  getPersonalized,
  getPersonalizedPrivatecontent,
  getRecommendedLatestMusic,
}
