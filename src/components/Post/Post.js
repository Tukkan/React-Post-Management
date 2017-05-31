import React, { Component } from 'react';
import { Panel } from 'react-bootstrap'
import { Link } from 'react-router'
import './Post.scss';
import PostsStore from '../../stores/PostsStore';
import RemovePost from '../RemovePost/RemovePost'

class PostsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  remove = (elem) => {
    PostsStore.removePost(this.props.data.id);
  };

  render() {
    return (
      <Panel className="post" header={this.props.data.title}>
        <div> {this.props.data.body}</div>
        <div fill className="buttons">
          <RemovePost onRemove={this.remove}>Remove</RemovePost>
          <Link to={`/posts/update/${this.props.data.id}`}  className="btn btn-primary btn-xs">Details</Link>
        </div>
      </Panel>
    )
  }
}

export default PostsContainer;