/** @format */

import request from '@utils/request'

// 邮箱登录
export function loginByEmail(params: {email: string; password: string}) {
  return request({
    url: '/login',
    method: 'POST',
    params,
  })
}

// 手机号登录
export function loginByPhone(params: {phone: string; password: string}) {
  return request({
    url: '/login/cellphone',
    method: 'GET',
    params,
  })
}

export default {
  loginByEmail,
  loginByPhone,
}
