import React, { useMemo, useState } from "react";
import PostForm from "./components/PostForm";
//import ClassCounter from "./components/ClassCounter";
//import Counter from "./components/Counter";
//import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyInput from "./components/UI/input/MyInput";
import MySelect from "./components/UI/select/MySelect";
import "./styles/App.css";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "а", body: "б" },
    { id: 2, title: "г", body: "а" },
    { id: 3, title: "я", body: "в" },
  ]);

  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const sortedPosts = useMemo(() => {
    console.log("getSortedPosts сработала");
    if(selectedSort) {
      return [...posts].sort((a,b) => a[selectedSort].localeCompare(b[selectedSort])) //sort мутирует массив, поэтому копия.
    }
    return posts;
  }, [selectedSort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery));
  }, [searchQuery, sortedPosts])

  //Добавление поста
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };
  //Удаление поста
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: "15px 0" }}></hr>
      <div>
        <MyInput
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Поиск..." 
        />
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Сортировка"
          options={[
            { value: "title", name: "По названию" },
            { value: "body", name: "По описанию" },
          ]}
        />
      </div>
      {/* Условная отрисовка */}
      {sortedAndSearchedPosts.length !== 0 ? (
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />
      ) : (
        <h1 style={{ textAlign: "center" }}>Посты не были найдены!</h1>
      )}
    </div>
  );
}

export default App;
