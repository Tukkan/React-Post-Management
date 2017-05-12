import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post/Post';
import { Glyphicon } from 'react-bootstrap'
import './PostsList.scss'

const renderPostList = function(data) {
  return data.map((postData, index) => <Post key={index} data={postData} />);
};

const renderError = function(isLoading) {
  if(isLoading){
    return (
      <div className="loading">
        <Glyphicon className="glyphicon-refresh-animate" glyph="refresh" />
      </div>
    )
  }
}


const PostsList = props => (
    <div className="postList">
      { renderError() }
      { renderPostList(props.data) }
    </div>
);

export default PostsList;

PostsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired)
};