import React, { useEffect, useState } from "react";
import { useRef } from "react";
import PostService from "../API/PostService";
import PostFilter from "../components/PostFilter";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/loader/Loader";
import MyModal from "../components/UI/modal/MyModal";
import Pagination from "../components/UI/pagination/Pagination";
import { useFetching } from "../hooks/useFetching";
import { usePosts } from "../hooks/usePosts";
import "../styles/App.css";
import { getPageCount } from "../utils/pages";

function Posts() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({sort:"", query:""})

  const [modal, setModal] = useState(false);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [totalPages, setTotalPages] = useState(0);

  const[limit, setLimit] = useState(10);
  const[page, setPage] = useState(1);

  const lastElement = useRef();
  const observer = useRef();
  console.log(lastElement);

  const [fetchPosts, isPostLoading, postError] = useFetching( async (limit, page) => {
    const responce = await PostService.getAll(limit, page);
    setPosts([...posts, ...responce.data]);
    const totalCount = responce.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  })

  useEffect(() => {
    if(isPostLoading) return;
    if(observer.current) observer.current.disconnect();
    var callback = function(entries, observer) {
        if(entries[0].isIntersecting && page < totalPages) {
          setPage(page+1);
        }
    };
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(lastElement.current)
    }, [isPostLoading])

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  }

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
      {postError && 
        <h1>Произошла ошибка ${postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />
      {isPostLoading &&
        <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader /></div>
      }
      <div ref={lastElement} style={{height: 20, background: "red"}}></div>
      <Pagination page={page} changePage={changePage} totalPages={totalPages}/> 
    </div>
  );
}

export default Posts;