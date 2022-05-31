import React, { useState } from "react";
//import ClassCounter from "./components/ClassCounter";
//import Counter from "./components/Counter";
//import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import "./styles/App.css";

function App() {

  const [posts, setPosts] = useState([
    {id:1, title:"JavaScritp 1", body:"Description"},
    {id:2, title:"JavaScritp 2", body:"Description"},
    {id:3, title:"JavaScritp 3", body:"Description"}
  ]);

  const [title, setTitle] = useState("");

  const [body, setBody] = useState("");

  const AddNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      body
    }
    setPosts([...posts, newPost]);
  }

  return (
    <div className="App">
      <form>
        <MyInput 
          type="text" 
          placeholder="Название поста" 
          value={title}
          onChange={e => setTitle(e.target.value)}/>
        <MyInput 
          type="text" 
          placeholder="Описание поста"
          value={body} 
          onChange={e => setBody(e.target.value)}
          />
        <MyButton onClick={AddNewPost}>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title="Посты про JS"/>
    </div>
  );

}

export default App;
