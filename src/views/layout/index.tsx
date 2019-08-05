/** @format */

import React, {Component} from 'react'
import {Layout} from 'antd'
import LoginApi from '@api/login'

import AppTopNav from './appTopNav'
import AppLeftAside from './appLeftAside'
import AppFooterPlay from './appFooterPlay'

import layOutStyle from './styles/layOut.scss'

const {Header, Sider, Content, Footer} = Layout

export default class LayOut extends Component {
  async componentDidMount() {
    console.log('LayOut componentDidMount')
    await LoginApi.loginByPhone({phone: '13176884538', password: 'chenhao112189'})
  }
  render() {
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
            <Content className={layOutStyle['main-content']}>{this.props.children}</Content>
          </Layout>
        </Layout>
        <Footer className={layOutStyle.footer}>
          <AppFooterPlay />
        </Footer>
      </Layout>
    )
  }
}
