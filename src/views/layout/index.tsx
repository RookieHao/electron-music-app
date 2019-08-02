/** @format */

import React, {Component} from 'react'
import {HashRouterProps, RouteComponentProps} from 'react-router-dom'
import {Layout} from 'antd'

// import {RouteType} from '@router/router.config'
import AppTopNav from './appTopNav'
import AppLeftAside from './appLeftAside'
import AppFooterPlay from './appFooterPlay'

import layOutStyle from './styles/layOut.scss'

const {Header, Sider, Content, Footer} = Layout

// interface RouteProps {
//   generateRoute:Function,
//   routes:RouteType[]
// }

export default class LayOut extends Component {
  render() {
    // let {routes,generateRoute} = this.props
    // const Routes = routes.map((r,i)=>generateRoute(r,i))
    return (
      <Layout>
        <Layout>
          <Sider className={layOutStyle['left-aside']}>
            <AppLeftAside />
          </Sider>
          <Layout>
            <Header className={layOutStyle.header}>
              <AppTopNav />
            </Header>
            <Content className={layOutStyle['main-content']}>
              {/* <Redirect to={ routes[0].path }></Redirect> */}
              {/* {Routes} */}
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
        <Footer className={layOutStyle.footer}>
          <AppFooterPlay />
        </Footer>
      </Layout>
    )
  }
}
