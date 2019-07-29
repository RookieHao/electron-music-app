/** @format */

import React from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'

const GoBack = ({history}: RouteComponentProps) => (
  <div>
    <p> test index </p>
    <button onClick={() => history.goBack()}> back </button>
  </div>
)

export default withRouter(GoBack)
