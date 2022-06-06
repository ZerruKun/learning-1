import React, { useMemo, useState } from "react";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
//import ClassCounter from "./components/ClassCounter";
//import Counter from "./components/Counter";
//import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/modal/MyModal";
// import MyInput from "./components/UI/input/MyInput";
// import MySelect from "./components/UI/select/MySelect";
import "./styles/App.css";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "а", body: "б" },
    { id: 2, title: "г", body: "а" },
    { id: 3, title: "я", body: "в" },
  ]);

  const [filter, setFilter] = useState({sort:"", query:""})

  const [modal, setModal] = useState(false);

  // const [selectedSort, setSelectedSort] = useState("");
  // const [searchQuery, setSearchQuery] = useState("");

  const sortedPosts = useMemo(() => {
    console.log("getSortedPosts сработала");
    if(filter.sort) {
      return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort])) //sort мутирует массив, поэтому копия.
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query));
  }, [filter.query, sortedPosts])

  //Добавление поста
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };
  //Удаление поста
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  // const sortPosts = (sort) => {
  //   setSelectedSort(sort);
  // }

  return (
    <div className="App">
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
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />
    </div>
  );
}

export default App;
