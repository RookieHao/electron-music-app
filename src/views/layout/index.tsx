import React,{Component} from "react";
import { Layout } from "antd";

import AppTopNav from './appTopNav';
import AppLeftAside from './appLeftAside';
import AppFooterPlay from './appFooterPlay';

import layOutStyle from './styles/layOut.scss';

const { Header, Sider, Content,Footer } = Layout;

export default class LayOut extends Component{
  render(){
    return (
      <Layout>
        <Header className={layOutStyle.header}><AppTopNav></AppTopNav></Header>
        <Layout>
          <Sider className={layOutStyle['left-aside']}><AppLeftAside></AppLeftAside></Sider>
          <Content className={layOutStyle['main-content']}>
            {this.props.children}
          </Content>
        </Layout>
        <Footer className={layOutStyle.footer}><AppFooterPlay></AppFooterPlay></Footer>
      </Layout>
    )
  }
}