import React, {Component} from 'react';
import './App.scss';
import PostsContainer from './components/Posts/PostsContainer'
import AppHeader from './components/AppHeader/AppHeader'
import AppFooter from './components/AppFooter/AppFooter'
import logo from './assets/img/logo.svg';
import { Grid } from 'react-bootstrap'
import './App.scss';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      logoSrc: logo
    }
  }

  render() {
    return (
      <Grid>
        <AppHeader logoSrc={this.state.logoSrc} />
        <PostsContainer />
        <AppFooter />
      </Grid>
    );
  }
}

export default App;
