import React from 'react';
import { withRouter } from 'react-router-dom';

const GoBack = ({ history }) => {
  return (
    <div>
        <p > test index </p>
        <button onClick={() => history.goBack()} > back </button>
    </div>
  )
};

export default withRouter(GoBack);
