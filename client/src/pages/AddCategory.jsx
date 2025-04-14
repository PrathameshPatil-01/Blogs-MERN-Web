import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addCategory } from '../services/category';


function AddCategory() {

  const [category, setCategory] = useState({
    "title": "",
    "description": ""
  });

  const navigate = useNavigate();

  const onAdd = async () => {

    const { title, description } = category;

    if (title.length == 0) {
      toast.warn('Please enter title')
    }
    else if (description.length == 0) {
      toast.warn('Please enter description')
    }
    else {
      const result = await addCategory(category);
      console.log(result);

      if (result['status'] == 'success') {
        toast.success("category added succesfully");
        navigate('/showcategories')
      }
      else {
        toast.error(result.error.sqlMessage)
      }
    }
  }

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className="mb-3">
          <label className="form-label">Category Title</label>
          <input
            onChange={(e) => {
              setCategory({ ...category, title: e.target.value })
            }}
            type="text" className="form-control" id="title" placeholder="Add title" />
        </div>
        <div className="mb-3">
          <label className="form-label">Category Description</label>
          <textarea
            onChange={(e) => {
              setCategory({ ...category, description: e.target.value })
            }}
            className="form-control" id="description" placeholder="Add description" />
        </div>
        <div className="d-block">
          <button onClick={onAdd} className="btn btn-primary" type="button">Add Category</button>
        </div>
      </div>
    </div>
  )
}

export default AddCategory
