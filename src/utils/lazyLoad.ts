/** @format */

import React, {ComponentType} from 'react'
import Loadable, {LoadingComponentProps} from 'react-loadable'
import {FunctionComponent} from 'react'

export default (
  loader: () => Promise<{default: ComponentType}>,
  {
    loading = Loading,
    timeout = 6000,
    delay = 100,
  }: {loading?: FunctionComponent<LoadingComponentProps>; timeout?: number; delay?: number} = {},
) =>
  Loadable({
    loader,
    loading,
    delay,
    timeout,
  })

function Loading(): JSX.Element {
  return React.createElement('div', {}, 'loading...')
}
