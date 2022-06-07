//import axios from "axios";
import React, { useEffect, useState } from "react";
import PostService from "./API/PostService";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
//import ClassCounter from "./components/ClassCounter";
//import Counter from "./components/Counter";
//import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import Loader from "./components/UI/loader/Loader";
import MyModal from "./components/UI/modal/MyModal";
import { usePosts } from "./hooks/UsePosts";
// import MyInput from "./components/UI/input/MyInput";
// import MySelect from "./components/UI/select/MySelect";
import "./styles/App.css";

function App() {
  const [posts, setPosts] = useState([]);

  // { id: 1, title: "а", body: "б" },
  // { id: 2, title: "г", body: "а" },
  // { id: 3, title: "я", body: "в" },

  const [filter, setFilter] = useState({sort:"", query:""})

  const [modal, setModal] = useState(false);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [isPostLoading, setIsPostLoading] = useState(false);

  async function fetchPosts() {
    setIsPostLoading (true);
    setTimeout( async () => {
      const posts = await PostService.getAll();
      setPosts(posts);
      setIsPostLoading (false);
    }, 1000)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  //Добавление поста
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };
  //Удаление поста
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <button onClick={fetchPosts}>GET POSTS</button>
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }}></hr>
      <PostFilter
        filter={filter} 
        setFilter={setFilter} 
      />
      {isPostLoading 
        ? <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader /></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />}
    </div>
  );
}

export default App;
