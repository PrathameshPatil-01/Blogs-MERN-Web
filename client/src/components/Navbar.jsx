import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    // const user = JSON.parse(sessionStorage.getItem('user'));
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
                <Link className="navbar-brand" to="/home">BLOGG</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/myblogs">My Blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/allblogs">All Blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addcategory">Add Category</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/showcategories">Show Categories</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addblog">Add Blog</Link>
                        </li>
                    </ul>
                    <button type="button" className="btn btn-danger">Logout</button>
                    </div>
            </nav>
        </>
    )
}

export default Navbar
