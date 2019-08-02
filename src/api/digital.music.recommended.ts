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

export default {
  getBanner,
  getPersonalized,
}
