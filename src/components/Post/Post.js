import React from 'react';
import { Panel } from 'react-bootstrap'
import './Post.scss';

const Posts= props => (
  <Panel className="post" header={props.data.title}>
    {props.data.body}
  </Panel>
);

export default Posts;
