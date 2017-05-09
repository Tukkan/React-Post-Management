import React, {Component} from 'react';
import './App.css';
import PostsContainer from './components/Posts/PostsContainer'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import logo from './assets/img/logo.svg';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      logoSrc: logo
    }
  }

  render() {
    return (
      <div className="App">
        <AppHeader logoSrc={this.state.logoSrc} />

        <PostsContainer />

        <AppFooter />
      </div>


    );
  }
}

export default App;
