import { EventEmitter } from 'fbemitter';
import { API_URL } from '../constants.js';
import 'whatwg-fetch';

class PostsStore {
  constructor(){
    this._data = [];
    this.emitter = new EventEmitter();

    this.getPosts();
  }

  getPosts = () => {
    if(this._data.length) {
      this.emitter.emit("push", this._data);
      return;
    }

    fetch(API_URL)
      .then((data) => data.json())
      .then((json) => {
        let jsonReversed = json.reverse();
        this._data = jsonReversed.slice();
        this.emitter.emit("push", jsonReversed);
      })
      .catch((err) => {
        this.emitter.emit("loadError");
      });
  };

  getPost = (id) => {
    if(typeof id === 'undefined') {
      console.warn("Post ID must be specified");
      return;
    }

    let post = this._data.filter((post) => {
      return post.id === parseInt(id, 10);
    });

    if(!post.length) {
      console.warn("Post has not been found");
    } else {
      return post[0];
    }
  };

  addPost = (postData) => {
    fetch(API_URL, {
      method: 'POST',
      body: postData
    }).then((resp) => {
      if(resp.ok){
        postData.id = this._data[0].id + 1;

        this._data.unshift(postData);
        this.emitter.emit('push', this._data);
      } else {
        this.emitter.emit("saveupdateerror");
      }
    }).catch(() => {
      this.emitter.emit("saveupdateerror");
    });
  };

  updatePost = (postData) => {
    let post = this._data.filter((elem) => elem.id === postData.id)[0];

    if(!post) console.warn("[UPDATE POST] Post has not been found");

    //Dla stworzonych przez nas postów nie da się robić requestów do API ze względu na błędne id
    if(post.id > 100){
      Object.assign(post, postData);
      this.emitter.emit('push', this._data);
      return;
    }

    fetch(`${API_URL}/${post.id}`, {
      method: 'PUT',
      body: postData
    }).then((resp) => {
      if(resp.ok){
        Object.assign(post, postData);
        this.emitter.emit('push', this._data);
      } else {
        this.emitter.emit("saveupdateerror");
      }
    }).catch(() => {
      this.emitter.emit("saveupdateerror");
    });
  };

  removePost = (postId) => {
      let idx = this._data.findIndex((elem) => elem.id === postId);
      this._data.splice(idx, 1);
      this.emitter.emit("push", this._data);
  }
}

const postsStoreInstance = new PostsStore();

export default postsStoreInstance;