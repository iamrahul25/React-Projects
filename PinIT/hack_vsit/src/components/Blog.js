import React from 'react'
import {useNavigate} from 'react-router-dom';
import './Blog.css'

const Blog = ({blog}) => {

    const navigate = useNavigate();

    // console.log("Single Blog",blog);
    function redirect(id){
        navigate(`/content/${id}`);
    }

    return (
        <>
            <div className="blogs" onClick={()=>{redirect(blog.id)}}>
                <div className="blog">
                    <h1>{blog.title} </h1>
                    <div className="blog-content">
                        <div className="creater">
                            <p>{blog.date}</p>
                            <p>{blog.author_name}</p>
                        </div>

                        <div className="content">
                            <p>{blog.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog