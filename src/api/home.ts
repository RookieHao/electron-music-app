/** @format */

import request from '../utils/request'

export function getHome(data: Object) {
  return request({
    method: 'POST',
    url: '/',
    data,
  })
}
