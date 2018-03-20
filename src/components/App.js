import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import Post from "./Post/Post";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://practiceapi.devmountain.com/api/posts")
      .then(response => {
        this.setState({
          posts: response.data
        });
      });
  }

  updatePost(id, text) {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then(res => {
        this.setState({
          posts: res.data
        });
      });
  }

  deletePost(id) {
    console.log(id);
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(res => {
        this.setState({
          posts: res.data
        });
      });
    console.log("fired");
  }

  createPost(text) {
    axios
      .post(`https://practiceapi.devmountain.com/api/posts?`, { text })
      .then(res => {
        this.setState({
          posts: res.data
        });
      });
  }

  render() {
    const { posts } = this.state;
    let postList = posts.map((e, i) => {
      return (
        <Post
          key={i}
          text={JSON.stringify(e.text)}
          date={e.date}
          id={e.id}
          updatePostFn={this.updatePost}
          deletePostFn={this.deletePost}
        />
      );
    });

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {postList}
        </section>
      </div>
    );
  }
}

export default App;
