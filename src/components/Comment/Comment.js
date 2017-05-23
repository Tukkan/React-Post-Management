import React, { Component } from 'react';
import 'whatwg-fetch';
import './Comment.scss';
import { Panel } from 'react-bootstrap'
import { EventEmitter } from 'fbemitter';



class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log("MOUNTED COMMENT")
    var emitter = new EventEmitter();
    emitter.addListener('yep', function() { console.log("RECEIVED EVENT"); });
  }

  render() {
    return (
      <Panel className="post" header={`${this.props.data.name} (${this.props.data.email})`}>
        <div>{this.props.data.body}</div>
      </Panel>
    )
  }
}

export default Comment;