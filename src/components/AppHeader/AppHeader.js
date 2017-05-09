import React from 'react';
import { PageHeader } from 'react-bootstrap'
import './AppHeader.scss';

const AppHeader = props => (
  <PageHeader>
    <img src={props.logoSrc} className="App-logo" alt="logo"/>
    Welcome to React
  </PageHeader>
);

export default AppHeader;