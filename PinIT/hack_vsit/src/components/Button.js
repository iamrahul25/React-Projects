import React from 'react'
import './Button.css'
import {Link} from 'react-router-dom'

 export const Button = () => {
  return (
    <Link to='Form'>
    <button className='btn'> Add Blog </button>
    </Link>
  )
}

