import React, { Component } from 'react';
import { API_URL } from '../../constants.js';
import 'whatwg-fetch';
import CommentList from '../CommentList/CommentList'
import EditPostForm from '../EditPostForm/EditPostForm';
import { Link } from 'react-router'
import Breadcrumbs from 'react-breadcrumbs';
import PostsStore from '../../stores/PostsStore';

import './EditPostContainer.scss';

class EditPostContainer extends Component {
  constructor(props) {
    super(props);

    this.loadComments();

    this.state = {
      comments: [],
      postId: this.props.routeParams.id
    };

  }

  loadComments = () => {
    fetch(API_URL + '/1/comments')
      .then((data) => data.json())
      .then((json) => {
        this.setState({
          comments: json
        })
      })
      .catch(() => {
        console.error("Comment's could not be fetched");
      });
  };

  componentDidMount() {
    PostsStore.emitter.addListener('saveupdateerror', () => {
      console.log("ERROR")
    });
  }

  render() {
    return (
      <div className="editPostContainer">
        <Breadcrumbs
          routes={this.props.routes}
          params={this.props.params}
        />

        <h3>Edit/Insert Post</h3>
        <EditPostForm postId={this.state.postId} />
        <CommentList data={this.state.comments} />
      </div>
    )
  }
}

export default EditPostContainer;