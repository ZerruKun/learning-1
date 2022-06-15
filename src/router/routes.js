import About from "../pages/About";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
// import Error from "../pages/Error";

export const privateRoutes = [
    {path: "/about",  element: About, exact: true},
    {path: "/posts",  element:  Posts, exact: true},
    {path: "/posts/:id",  element: PostIdPage, exact: true},
    {path: "/",  element: Posts, exact: true},
]

export const publicRoutes = [
    {path: "/login",  element:  Login, exact: true},
    {path: "/",  element:  Login, exact: true},
]

    // <Routes>
    //   <Route path="" element={<Posts />}></Route>
    //   <Route path="/about" element={<About />}/>
    //   <Route path="/posts" element={<Posts />}/>
    //   <Route path="/error" element={<Error />}/>
    //   <Route path="/posts/:id" element={<PostIdPage />} />
    //   <Route path="*" element={<Navigate to="/error" />} />
    // </Routes>

