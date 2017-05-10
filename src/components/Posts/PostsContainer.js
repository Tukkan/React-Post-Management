import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PostsList from './PostsList/PostsList';
import AddPost from './AddPost';
import SearchPosts from './SearchPosts';
import LoadError from './LoadError';
import 'whatwg-fetch';

class PostsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originalData: [],
      filteredData: [],
      loading: false,
      errorOccured: false
    };

    this.getPosts   = this.getPosts.bind(this);
    this.searchPost = this.searchPost.bind(this);
    this.onPostSave = this.onPostSave.bind(this);
  }

  getPosts() {
    this.setState({
      loading: true
    });

    fetch('http://jsonplaceholder.typicode.com/posts')
      .then((data) => data.json())
      .then((json) => {
        let jsonReversed = json.reverse();
        this.setState({
          originalData: jsonReversed,
          filteredData: jsonReversed.slice(),
          loading: false,
          errorOccured: false
        })
      })
      .catch((err) => {
        this.setState({
          errorOccured: true,
          loading: false
        })
      })
  }

  searchPost(event) {
    let inputValue = event.target.value;
    let filteredData;

    if(!inputValue) {
      this.setState({
        filteredData: this.state.originalData.slice()
      });
      return;
    }

    filteredData = this.state.originalData
      .filter((post) => post.title.indexOf(inputValue) > -1 || post.body.indexOf(inputValue) > -1)
      .map((post) => {return {
        ...post,
        title: this.highlightData(post.title, inputValue),
        body: this.highlightData(post.body, inputValue),
      }});

    this.setState({
      filteredData: filteredData
    })
  }

  highlightData(str, val) {
    let highlightRegExp = new RegExp("("+val+")", "gi");

    return str
      .split(highlightRegExp)
      .map((part, idx) =>
        <span key={idx} className={ part === val ? "highlight" : ""}>{part}</span>
      )
  }

  onPostSave(title, body){
    let newID = this.state.originalData[this.state.originalData.length - 1].id + 1;
    let newRecord = {id: newID, userId: 1, title: title, body: body};

    this.setState({
      originalData: [
        {...newRecord},
        ...this.state.originalData
      ],
      filteredData: [
        {...newRecord},
        ...this.state.filteredData
      ]
    })
  }

  componentDidMount() {
    this.getPosts();
  }

  render() {
    return (
      <div className="posts">
        <Row>
          <Col xs={12} sm={3}>
            <SearchPosts onChange={this.searchPost} />
          </Col>
          <Col xs={12} sm={9} className="text-right">
            <AddPost onSave={this.onPostSave} />
          </Col>
        </Row>
        <PostsList loading={this.state.loading} data={this.state.filteredData} />
        {
          this.state.errorOccured &&
          <LoadError callback={this.getPosts} />
        }
      </div>
    );
  }
}

export default PostsContainer;
