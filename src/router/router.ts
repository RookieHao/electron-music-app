/** @format */

import LazyLoad from '@utils/lazyLoad'
import LayOut from '../views/layout'

export default [
  {
    path: '/',
    redirect: '/digital-music',
    component: LayOut,
    children: [
      {
        path: '/digital-music',
        component: LazyLoad(() => import(/* webpackChunkName:"digitalMusic" */ '@views/digitalMusic')),
      },
      {
        path: '/FM_Top',
        component: LazyLoad(() => import(/* webpackChunkName:"FmTop" */ '@views/FmTop')),
      },
      {
        path: '/LOOK_Live',
        component: LazyLoad(() => import(/* webpackChunkName:"lookLive" */ '@views/lookLive')),
      },
      {
        path: '/Video',
        component: LazyLoad(() => import(/* webpackChunkName:"video" */ '@views/video')),
      },
      {
        path: '/FriendList',
        component: LazyLoad(() => import(/* webpackChunkName:"friendList" */ '@views/friendList')),
      },
      {
        path: '/MUSIClocal',
        component: LazyLoad(() => import(/* webpackChunkName:"musicLocal" */ '@views/musicLocal')),
      },
      {
        path: '/DownloadManager',
        component: LazyLoad(() => import(/* webpackChunkName:"downloadManager" */ '@views/downloadManager')),
      },
    ],
  },
]
