/** @format */

import React from 'react'
interface IconProps {
  iconName: string
}

export function SvgIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" width="1em" height="1em">
      <use xlinkHref={'#icon-' + props.iconName}></use>
    </svg>
  )
}
