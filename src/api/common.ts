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
// 获取歌曲详情
export function getMusicDetail(ids: string) {
  return request({
    url: 'song/detail',
    method: 'GET',
    params: {ids},
  })
}

export default {
  getMusicAudio,
  getPlayListDetail,
  getMusicDetail,
}
