import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getMyBlogs } from '../services/blog'
import { toast } from 'react-toastify';

function MyBlogs() {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogList();
  }, [])

  const blogList = async () => {
    const result = await getMyBlogs()
    console.log(result);

    if (result['status'] == 'success') {
      console.log("my blogs shown succesfully");
      toast.success("My blogs shown succesfully")
      setBlogs([...result.data])
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


  return (
    <div>
      <Navbar />
      <>
        <div className='d-flex m-3'>
          <h2 className='mx-auto'>My Blogs</h2>
        </div>
        {blogs && blogs.map((blog) => {
          return (
            <div className="card border-info m-3 mx-auto" style={{ width: "70%" }} key={blog.id}>
              <div className="card-header">{blog.category_id}</div>
              <div className="card-body blog-cards ">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.contents}</p>
              </div>
              <div className="card-footer" style={{ backgroundColor: "lightgrey" }}>
                <large className="text-body-secondary d-flex justify-content-end">Updated {timeAgo(blog.updated_at)}</large>
              </div>
            </div>
          )
        }
        )}
      </>
    </div>
  )
}

export default MyBlogs
