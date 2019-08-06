/** @format */

import request from '@utils/request'

export function getMusicAudio(id: number) {
  return request({
    url: '/song/url',
    method: 'GET',
    params: {id},
  })
}

export default {
  getMusicAudio,
}
