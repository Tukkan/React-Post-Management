import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PostsList from '../PostsList/PostsList';
import AddPost from '../AddPost/AddPost';
import SearchPosts from '../SearchPosts/SearchPosts';
import LoadError from '../LoadError/LoadError';
import 'whatwg-fetch';
import classNames from 'classnames';
import './PostsContainer.scss';
import PostsStore from '../../stores/PostsStore';

class PostsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originalData: [],
      filteredData: [],
      loading: true,
      errorOccured: false
    };
  }

  componentDidMount() {
    /*
      OK, moglem wspoldzielic dane w routerze, przez this.props.routes
      i trzymac dane w polu statycznym ale wpadlem na to jak eventy juz byly gotowe.
      Moglem tez uzyc this.refs ale nie podoba mi sie to ;)
    */

    PostsStore.emitter.addListener("push", (data) => {
      this.setState({
        originalData: data,
        filteredData: data.slice(),
        loading: false,
        errorOccured: false
      })
    });

    PostsStore.emitter.addListener("loadError", () => {
      this.setState({
        errorOccured: true,
        loading: false
      })
    });

    PostsStore.getPosts();
  }

  componentWillUnmount() {
    PostsStore.emitter.removeAllListeners();
  }

  getPosts = () => {
    this.setState({
      loading: true
    });
  };

  searchPost = (event) => {
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
      .map((post) => ({
        ...post,
        title: this.highlightData(post.title, inputValue),
        body: this.highlightData(post.body, inputValue),
      }));

    this.setState({
      filteredData: filteredData
    })
  };

  highlightData = (str, val) => {
    let highlightRegExp = new RegExp(`(${val})`, "gi");

    return str
      .split(highlightRegExp)
      .map((part, idx) =>
        <span key={idx} className={classNames({highlight: part === val})}>{part}</span>
      )
  };

  onPostSave = (title, body) => {
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
  };
  //
  // componentDidMount() {
  //   this.getPosts();
  // }

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
