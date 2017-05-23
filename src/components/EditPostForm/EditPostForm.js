import React, { Component } from 'react';
import 'whatwg-fetch';
import './EditPostForm.scss';
import usersListData from '../../data/users.json';
import UsersList from '../UsersList/UsersList';
import PostsStore from '../../stores/PostsStore';

class EditPostForm extends Component {
  constructor(props) {
    super(props);
    let post;

    if(this.props.postId){
      post = PostsStore.getPost(this.props.postId);
      console.log("POST", post, !!post)
    }

    this.initialState = {
      isAdd: !post,
      titleValid: true,
      bodyValid:  true,
      userValid:  true,
      title:  post ? post.title : "",
      body:   post ? post.body : "",
      userId: post ? post.userId : null,
    };

    this.state = { ...this.initialState };
  }

  onUserChange = (usr) => {
    this.setState({
      userId: usr.id
    })
  };

  onSubmit = () => {
    let isValid = this.validate();
    let postData = {};

    console.log(this.state.isAdd);

    if(isValid){
      postData = {
        title: this.state.title,
        body: this.state.body,
        userId: this.state.userId
      };

      if(this.state.isAdd){
        PostsStore.addPost(postData);
      } else {
        postData.id = parseInt(this.props.postId, 10);
        PostsStore.updatePost(postData);
      }
    }
  };

  validate = () => {
    this.setState({
      titleValid: !!this.state.title.length,
      bodyValid: !!this.state.body.length,
      userValid: this.state.userId !== null
    });

    return !!this.state.title.length && !!this.state.body.length && this.state.userId !== null
  };

  cancel = () => {
    this.setState({...this.initialState})
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="editPostForm">
        <div>
          { !this.state.titleValid && <div className="invalidValue">Title is required</div> }
          <input placeholder="title" value={this.state.title} name="title" onChange={this.handleInputChange} />
        </div>
        <div>
          { !this.state.bodyValid && <div className="invalidValue">Body is required</div> }
          <textarea placeholder="Body" value={this.state.body} name="body" onChange={this.handleInputChange}></textarea>
        </div>

        { !this.state.userValid && <div className="invalidValue">User is required</div> }
        <UsersList data={usersListData} selectedId={this.state.userId} onChange={this.onUserChange} />

        <div className="buttons">
          <button className="brn btn-primary" onClick={this.onSubmit}>{this.props.postId ? 'Update' : 'Save'}</button>
          <button className="brn btn-info" onClick={this.cancel}>Cancel</button>
        </div>
      </div>
    )
  }
}

export default EditPostForm;