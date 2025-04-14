import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addBlog } from '../services/blog';

function AddBlog() {

  const [blog, setBlog] = useState({
    "title": "",
    "contents": ""
  });

  const navigate = useNavigate();

  const onAdd = async () => {

    const { title, contents } = blog;

    if (title.length == 0) {
      toast.warn('Please enter title')
    }
    else if (contents.length == 0) {
      toast.warn('Please enter description')
    }
    else {
      const result = await addBlog(blog);
      console.log(result);

      if (result['status'] == 'success') {
        console.log("blog added succesfully");
        toast.success("blog added succesfully");
        navigate('/myblogs')
      }
      else {
        toast.error(result.error.sqlMessage)
      }
    }
  }

  return (
    <div>
      <Navbar />
      <div className='container mt-4'>
      <div className='mb-4'>
          <h3>Add Category</h3>
        </div>
        <div className="mb-3">
          <label className="form-label">Blog Title</label>
          <input
            onChange={(e) => {
              setBlog({ ...blog, title: e.target.value })
            }}
            type="text" className="form-control" id="title" placeholder="Add title" />
        </div>
        <div className="mb-3">
          <label className="form-label">Blog contents</label>
          <textarea rows={10}
            onChange={(e) => {
              setBlog({ ...blog, contents: e.target.value })
            }}
            className="form-control" id="description" placeholder="Add contents" />
        </div>
        <div>
          <div className="input-group mb-3">
            <label className="input-group-text" for="inputGroupSelect01">Category</label>
            <select onChange={(e) => {
              console.log(e.target.value)
              setBlog({ ...blog, category_id: e.target.value })
            }} className="form-select" id="inputGroupSelect01">
              <option selected>Select from Categories...</option>
              <option value="1">Food</option>
              <option value="2">Travel</option>
              <option value="3">Health and Fitness</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button onClick={onAdd} className="btn btn-success" type="button">Save Blog</button>
        </div>
      </div>
    </div>
  )
}

export default AddBlog
