import React, { Component } from 'react';
import Comment from '../Comment/Comment'
import 'whatwg-fetch';
import './CommentList.scss';

class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderCommentList = (data) => data.map((commentData, index) => <Comment key={index} data={commentData} />);

  render() {
    return (
      <div className="commentList">
        <h4>Comments:</h4>
        {
          this.renderCommentList(this.props.data)
        }
      </div>
    )
  }
}

export default CommentList;