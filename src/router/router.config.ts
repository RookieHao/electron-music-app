/** @format */

import LazyLoad from '@utils/lazyLoad'
import LayOut from '../views/layout'

interface RouteType {
  path: string
  redirect?: any
  component?: any
  children?: RouteType[]
}

const Router: RouteType[] = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
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
  {
    path: '/login',
    component: LazyLoad(() => import(/* webpackChunkName:"Login" */ '@views/test')),
  },
  {
    path: '*',
    component: LazyLoad(() => import(/* webpackChunkName:"404" */ '@views/404')),
  },
]

export default Router
