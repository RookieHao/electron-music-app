import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import LeftAsideStyle from '../styles/appLeftAside.scss'

interface State {
  menus:Array<{name:string,key:string,items:Array<{name:string,key:string,icon:string}>}>;
  activeItemKey:string
}

class LeftAside extends Component<RouteComponentProps> {
  state:State
  constructor(props: RouteComponentProps){
    super(props)
    this.state = {
      menus:[
        {
          name:'推荐',
          key:'recommendedBooks',
          items:[
            {
              name:"发现音乐",
              key:'digital-music',
              icon:'mail'
            },
            {
              name:"私人FM",
              key:'FM_Top',
              icon:'mail'
            },
            {
              name:"LOOK直播",
              key:'LOOK_Live',
              icon:'mail'
            },
            {
              name:"视频",
              key:'Video',
              icon:'mail'
            },
            {
              name:"朋友",
              key:'FriendList',
              icon:'mail'
            }
          ]
        },
        {
          name:'我的音乐',
          key:'_Music',
          items:[
            {
              name:"本地音乐",
              key:'MUSIClocal',
              icon:'mail'
            },
            {
              name:"下载管理",
              key:'DownloadManager',
              icon:'mail'
            }
          ]
        }
      ],
      activeItemKey:'digital-music'
    }
  }
  menuItemClick = key => {
    this.setState({
      activeItemKey:key
    })
    this.props.history.push(key)
  }
  generateMenus = ()=>{
    let { menus,activeItemKey } = this.state;
    let generateMenuItems = []
    menus.forEach(menu=>{
      generateMenuItems.push(<li key={menu.key} className={LeftAsideStyle['group-title']}>{menu.name}</li>)
      if(menu.items){
        generateMenuItems.push(menu.items.map(item=>{
          return (<li 
            key={item.key}
            className={LeftAsideStyle['menu-item'] + ' ' + (activeItemKey === item.key?LeftAsideStyle['active-item']:LeftAsideStyle['menu-item-normal'])} 
            onClick = { () => this.menuItemClick(item.key) }>
            <span>{item.name}</span>
          </li>)
        }))
      }
    })

    return generateMenuItems
  }
  render() {
    return (
      <aside className={LeftAsideStyle['left-aside']}>
        <ul className={LeftAsideStyle['menu-content']}>
          {
            this.generateMenus()
          }
        </ul>
      </aside>
    )
  }
}

export default withRouter(LeftAside);
