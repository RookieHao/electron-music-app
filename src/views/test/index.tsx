import React from 'react';
import { withRouter } from 'react-router-dom';
import SCSS from '../layout/styles/index.scss';

const GoBack = ({ history }) => {
  return (
    <div>
        <p className={ SCSS.scss1 }> test index </p>
        <button onClick={() => history.goBack()} > back </button>
    </div>
  )
};

export default withRouter(GoBack);
