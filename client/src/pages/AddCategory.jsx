import React from 'react'
import Navbar from '../components/Navbar'

function AddCategory() {
  return (
    <div>
      <Navbar />
      <div className="mb-3">
        <label for="title" className="form-label">Example label</label>
        <input type="text" className="form-control" id="title" placeholder="Add title" />
      </div>
      <div className="mb-3">
        <label for="description" className="form-label">Another label</label>
        <textarea className="form-control" id="description" placeholder="Add description" />
      </div>
    </div>
  )
}

export default AddCategory
