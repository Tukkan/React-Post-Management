import React from 'react';
import './Post.scss';
import { Panel } from 'react-bootstrap'

const Posts= props => (
  <Panel className="post" header={props.data.title}>
    {props.data.body}
  </Panel>
);

export default Posts;
