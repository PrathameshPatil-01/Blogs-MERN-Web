import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { deleteBlog, getAllBlogs } from '../services/blog'
import { toast } from 'react-toastify';

function AllBlogs() {

  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    blogList();
  }, [])


  const blogList = async () => {
    const result = await getAllBlogs()
    console.log(result);

    if (result['status'] == 'success') {
      console.log("All blogs shown succesfully");
      toast.success("All blogs shown succesfully")
      setBlogs([...result.data])
    }
    else {
      toast.error(result.error.sqlMessage)
    }
  }

  const onDelete = async (blog_id) => {
    const result = await deleteBlog(blog_id);

    if (result['status'] == 'success') {
      console.log("blog deleted succesfully");
      toast.success("blog deleted succesfully")
      blogList();
    }
    else {
      toast.error(result.error.sqlMessage)
    }
  }

  function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHr = Math.round(diffMin / 60);

    if (diffSec < 60) {
      return `${diffSec} second${diffSec == 1 ? "" : "s"} ago`;
    } else if (diffMin < 60) {
      return `${diffMin} minute${diffMin == 1 ? "" : "s"} ago`;
    } else if (diffHr < 24) {
      return `${diffHr} hour${diffHr == 1 ? "" : "s"} ago`;
    } else {
      return past.toLocaleDateString(); // Or a more specific date format if needed
    }
  }
  function isSubstring(mainString, subString) {
    return mainString.toLowerCase().includes(subString.toLowerCase());
  }

  const user = JSON.parse(sessionStorage.getItem('user'));

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <form className="d-flex" role="search">
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setBlogs(blogs.filter((blog) => isSubstring(blog.title, searchTerm)))
            }}
            className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button
            onClick={() => {
              setSearchTerm('')
              setBlogs()
            }}
            className="btn btn-outline-success" type="submit">Reset Search</button>
        </form>
      </div>
      <>
        {blogs && blogs.map((blog) => {
          return (
            <div className="card border-info m-3 mx-auto" style={{ width: "70%" }} key={blog.id}>
              <div className="card-header d-flex justify-content-between">
                <button className='btn btn-secondary'>{blog.category_title}</button>
                <span><pre>{blog.first_name} {blog.last_name}</pre></span>
                {user.id == blog.user_id &&<button className='btn btn-outline-info'>Edit</button>}
              </div>
              <div className="card-body blog-cards ">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.contents}</p>
              </div>
              <div className="card-footer  d-flex justify-content-between align-items-center" style={{ backgroundColor: "lightgrey" }}>
                <small className="text-body-secondary">Updated {timeAgo(blog.updated_at)}</small>
                {user.id == blog.user_id &&
                  <button className='btn btn-danger' onClick={() => { onDelete(blog.id) }}>Delete</button>}
              </div>
            </div>
          )
        }
        )}
      </>
    </div>
  )
}

export default AllBlogs
