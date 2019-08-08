/** @format */

import request from '@utils/request'

// 获取音乐url
export function getMusicAudio(id: number) {
  return request({
    url: '/song/url',
    method: 'GET',
    params: {id},
  })
}

// 获取歌单详情
export function getPlayListDetail(id: number) {
  return request({
    url: '/playlist/detail',
    method: 'GET',
    params: {id},
  })
}
export default {
  getMusicAudio,
  getPlayListDetail,
}
