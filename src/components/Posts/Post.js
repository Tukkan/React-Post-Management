import React from 'react';

const Posts= props => (
  <div className="post">
    <h3>{props.data.title}</h3>
    <p>{props.data.body}</p>
  </div>
);

export default Posts;