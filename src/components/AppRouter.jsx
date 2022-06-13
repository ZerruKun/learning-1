import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Error from '../pages/Error'
import PostIdPage from '../pages/PostIdPage'
import Posts from '../pages/Posts'

const AppRouter = () => {
  return (
    <Routes>
    <Route path="/about" element={<About />}/>
    <Route path="/posts" element={<Posts />}/>
    <Route path="/error" element={<Error />}/>
    {/* Двоетоечие после id динамического маршрута */}
    <Route path="/posts/:id" element={<PostIdPage />} />
    <Route path="/*" element={<Navigate to="/error" />} />
  </Routes>
  )
}

export default AppRouter
