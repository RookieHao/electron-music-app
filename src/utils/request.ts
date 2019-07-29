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
    nprogress.done()
  },
)

service.interceptors.response.use(
  response => {
    nprogress.done()

    return response
  },
  error => {
    nprogress.done()
  },
)

export default service
