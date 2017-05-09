import React from 'react';
import Post from './Post/Post';


const PostsList = props => (
    <div className="postList">
    { props.data.length === 0 &&
      <div>Fetching</div>
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