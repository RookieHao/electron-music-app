/** @format */

import React from 'react'
interface IconProps {
  iconName: string
}

export default function SvgIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" width="1em" height="1em" style={{margin: '.1em'}}>
      <use xlinkHref={'#icon-' + props.iconName}></use>
    </svg>
  )
}
