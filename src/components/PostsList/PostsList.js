import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post/Post';
import { Glyphicon } from 'react-bootstrap'
import './PostsList.scss'

const PostsList = props => (
    <div className="postList">
    { props.loading &&
      <div className="loading">
          <Glyphicon className="glyphicon-refresh-animate" glyph="refresh" />
      </div>
    }
    {
      props.data.map(function(postData, index){
        return (
          <Post key={index} data={postData} />
        )
      })
    }
    </div>
);

export default PostsList;

PostsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired)
};