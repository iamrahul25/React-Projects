import React, { useRef, useEffect } from 'react';
import { useUserContext } from "../context/UserContext";
import './AddPlace.css';


const Form = () => {

    const { saveBlog, reloadPage, setReloadPage } = useUserContext();

    const formRef = useRef(null);

    const handleSubmit = (e)=>{

        e.preventDefault();
        
        const values = {
            author_name: formRef.current.author_name.value,
            title: formRef.current.title.value,
            content: formRef.current.content.value,
            date: formRef.current.date.value,
        }

        console.log("Form Values: ", values);

        //Saving To Database
        saveBlog(values);

        //Reloading AllBlogs after Adding new BLog
        setReloadPage(reloadPage + 1);
    }

    return (


        <div className="form-container">

            <form onSubmit={handleSubmit} ref={formRef}>
                
                <div className="input">
                    <label htmlFor="author_name">Author Name : </label>
                    <input type="text" name="author_name" placeholder='Write Full Name' required />
                </div>

                <div className="input">
                    <label htmlFor="title">Title : </label>
                    <input type="text" name="title" placeholder="Write Blog's Title" required/>
                </div>

                <div className="input">
                    <label htmlFor="date">Date : </label>
                    <input type="Date" name="date" placeholder='Select Date' required/>
                </div>

                <div className="input">
                    <label htmlFor="content">Write Content: </label>
                    <textarea name="content" className='user' placeholder='Write Your Blog here'  required/>
                </div>

                <button type="submit" className="button">Submit</button>

            </form>

        </div>

    )
}

export default Form;