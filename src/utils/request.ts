/** @format */

import axios from 'axios'
import nprogress from 'nprogress'

const service = axios.create({
  withCredentials: true,
  baseURL: 'http://love.miko.org.cn',
})

service.interceptors.request.use(
  config => {
    nprogress.start()
    return config
  },
  error => {
    Promise.reject(error.message)
    nprogress.done()
  },
)

service.interceptors.response.use(
  response => {
    nprogress.done()

    let data = response.data

    if (response.statusText === 'OK' && data.code === 200) {
      return response.data
    }

    return response
  },
  error => {
    Promise.reject(error.message)
    nprogress.done()
  },
)

export default service
