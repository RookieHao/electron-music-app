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
    params: {limit: 10},
  })
}

// 个性推荐 - 独家放送
export function getPersonalizedPrivatecontent() {
  return request({
    method: 'GET',
    url: '/personalized/privatecontent',
  })
}

// 个性推荐 - 最新音乐
export function getRecommendedLatestMusic() {
  return request({
    method: 'GET',
    url: '/personalized/newsong',
  })
}

// 个性推荐 - 推荐MV
export function getPpersonalizedMV() {
  return request({
    url: '/personalized/mv',
    method: 'GET',
  })
}

// 个性推荐 - 推荐电台
export function getPersonalizedDjprogram() {
  return request({
    url: '/personalized/djprogram',
    method: 'GET',
  })
}

// 个性推荐 - LOOK直播
export function getLookRecommended() {
  return request({
    url: '/program/recommend',
    method: 'GET',
  })
}

export default {
  getBanner,
  getPersonalized,
  getPersonalizedPrivatecontent,
  getRecommendedLatestMusic,
  getPpersonalizedMV,
  getPersonalizedDjprogram,
  getLookRecommended,
}
