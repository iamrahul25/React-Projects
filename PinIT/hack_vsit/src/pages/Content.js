import React, {useState, useEffect} from 'react'
import { useUserContext } from "../context/UserContext";
import {useParams} from 'react-router-dom'
import './Content.css'
import addblog_image from '../images/addblog_image.jpg';

const Content = () => {

    const { allBlogs, getSingleBlog } = useUserContext();
    const [currentBlog, setCurrentBlog] = useState({});

    const { blog_id } = useParams();
    console.log("Blog ID is: ", blog_id);


    useEffect(()=>{

        async function getBlog(){
            const blog = await getSingleBlog(blog_id);
            setCurrentBlog(blog);
        }
        
        getBlog();

    },[]);

    return (
        <>
            <div>

                <div className="content-container">

                    <div className="heading" style={{ backgroundImage: `url(${addblog_image})` }}>
                        <h1>{currentBlog.title}</h1>
                    </div>

                    <div className="content-part">

                        <div className="content-info">
                            <p>{currentBlog.date}</p>
                            <p>{currentBlog.author_name}</p>
                        </div>

                        <div className="content-text">
                            <p>{currentBlog.content}</p>
                        </div>
                        
                    </div>

                </div>

            </div>

        </>
    )
}

export default Content