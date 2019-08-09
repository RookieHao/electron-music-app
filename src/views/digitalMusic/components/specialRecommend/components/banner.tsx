/** @format */

import React, {Component} from 'react'
import {Carousel} from 'antd'
import RecommendedApi from '@api/digital.music.recommended'
import RecommendedStyle from '../index.scss'
import {BannersResponseData, bannerItem} from '@declaration/banner'
export default class carousel extends Component<{title?: string}, StateTypes> {
  constructor(props: {}) {
    super(props)
    this.state = {
      banners: [],
    }
  }
  componentDidMount() {
    this.getBanner()
  }
  getBanner = async () => {
    try {
      let bannersData = ((await RecommendedApi.getBanner()) as unknown) as BannersResponseData
      this.setState({banners: bannersData.banners})
    } catch (error) {
      console.error(error)
    }
  }
  public render() {
    let {banners} = this.state
    return (
      <div className={RecommendedStyle.banners}>
        <Carousel autoplay={true}>
          {banners.map(({imageUrl}, key) => (
            <div key={key}>
              <div>
                <img style={{width: '100%'}} src={imageUrl} alt="" />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    )
  }
}

interface StateTypes {
  banners: bannerItem[]
}
