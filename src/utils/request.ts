/** @format */

import axios from 'axios'
import nprogress from 'nprogress'

const service = axios.create({
  withCredentials: true,
  baseURL: 'http://love.moko.org.cn',
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

    return response
  },
  error => {
    Promise.reject(error.message)
    nprogress.done()
  },
)

export default service
