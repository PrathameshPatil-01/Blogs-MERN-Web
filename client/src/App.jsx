import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import AddBlog from './pages/AddBlog'
import AddCategory from './pages/AddCategory'
import AllBlogs from './pages/AllBlogs'
import MyBlogs from './pages/MyBlogs'
import ShowCategories from './pages/ShowCategories'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<AllBlogs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addblog" element={<AddBlog />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/allblogs" element={<AllBlogs />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/showcategories" element={<ShowCategories />} />
      </Routes>

      <ToastContainer />
    </div>
  )
}

export default App
