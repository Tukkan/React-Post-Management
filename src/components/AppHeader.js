import React from 'react';


const AppHeader = props => (
  <header>
    <img src={props.logoSrc} className="App-logo" alt="logo"/>
    <h2>Welcome to React</h2>
  </header>
);

export default AppHeader;