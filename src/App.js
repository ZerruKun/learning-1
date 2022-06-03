import React, { useState } from "react";
import PostForm from "./components/PostForm";
//import ClassCounter from "./components/ClassCounter";
//import Counter from "./components/Counter";
//import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import "./styles/App.css";

function App() {
  //Добавление поста
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  }
  //Удаление поста
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  const [posts, setPosts] = useState([
    {id:1, title:"JavaScritp 1", body:"Description"},
    {id:2, title:"JavaScritp 2", body:"Description"},
    {id:3, title:"JavaScritp 3", body:"Description"}
  ]);

  return (
    <div className="App">
      <PostForm create={createPost}/>
      {/* Условная отрисовка */}
      {posts.length !== 0 
        ? <PostList remove={removePost} posts={posts} title="Посты про JS"/>
        : <h1 style={{textAlign : "center"}}>Посты не были найдены!</h1>
      }
    </div>
  );

}

export default App;
