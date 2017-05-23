import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap'
import './AppHeader.scss';


const AppHeader = props => (
  <PageHeader>
    <img src={props.logoSrc} className="App-logo" alt="logo"/>
    Welcome to React

  </PageHeader>
);

AppHeader.propTypes = {
  logoSrc: PropTypes.string.isRequired
};

export default AppHeader;