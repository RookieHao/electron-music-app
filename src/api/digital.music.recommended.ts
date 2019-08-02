/** @format */

import request from '@utils/request'

export function getBanner() {
  return request({
    method: 'GET',
    url: '/banner?type=0',
  })
}

export default {
  getBanner,
}
