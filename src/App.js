import React, {Component} from 'react';
import './App.scss';
import PostsContainer from './components/PostsContainer/PostsContainer'
import AppHeader from './components/AppHeader/AppHeader'
import AppFooter from './components/AppFooter/AppFooter'
import EditPostContainer from './components/EditPostContainer/EditPostContainer'
import logo from './assets/img/logo.svg';
import { Grid } from 'react-bootstrap'
import './App.scss';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'


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

        <Router history={hashHistory}>
          <Route path="posts" name="Posts">
            <IndexRoute component={PostsContainer} />
            <Route name="Add Post"  path="add" component={EditPostContainer} />}  />
            <Route getDisplayName={param => `Update Post (id: ${param.id})`} path="update/:id" component={EditPostContainer} />} />
          </Route>
        </Router>

        <AppFooter />
      </Grid>
    );
  }
}

export default App;
