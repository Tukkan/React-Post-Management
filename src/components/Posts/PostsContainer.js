import React, {Component} from 'react';
import PostsList from './PostsList';
import 'whatwg-fetch'

class PostsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    this._getPosts();
  }

  _getPosts() {
    fetch('http://jsonplaceholder.typicode.com/posts')
      .then((data) => data.json())
      .then((json) => this.setState({ data: json }))
  }

  render() {
    return (
      <PostsList data={this.state.data} />
    );
  }
}

export default PostsContainer;
