import React from 'react'
import './ContactUs.css'
import contact_image from '../images/contact_image.jpg'

const ContactUs = () => {
  return (
    <>
      <div className="contact-us" style={{ backgroundImage: `url(${contact_image})` }}>
        <div className="contact-main">
          <div className="contact-heading">
            <h1>CONTACT FORM</h1>
          </div>
          <div className="contact-form">
            <div className="contact-page">

              <div className="form-disc">
                <h3>Contact us</h3>
                <p>
                  Fill in the form below to get in touch with us.
                </p>
              </div>

              <form action="">
                <div className="contact-input">
                  <label for="fname">Name : </label>
                  <input type="text" id="fname" name="fname" placeholder='Your name...' />
                </div>

                <div className="contact-input">
                  <label for="fname">Email : </label>
                  <input type="text" id="fname" name="fname" placeholder='Your Email...' />
                </div>

                <div className="contact-input">
                  <label for="fname">Subject : </label>
                  <input type="text" id="fname" name="fname" placeholder='Message Subject...' />
                </div>
                <div className="contact-input">
                  <label for="fname">Message : </label>
                  <textarea name='blog' className='user' placeholder='Message Text' />
                </div>
                <div className="contact-btn">
                  <button type="submit" className="button">Send Message</button>
                </div>
              </form>

            </div>

            <div className="contact-social-container">
              <div className="contact-social-desc">
                <p>Or Find us here :</p>
              </div>
              <div className="contact-social">
                <div className="contact-social-icon">
                <a href="https://www.facebook.com/ashutoshkumar.giri.98/">
                  <i className="fab fa-facebook-square" />
                  </a>
                  <span>Facebook</span>
                </div>
                <div className="contact-social-icon">
                <a href="https://twitter.com/ASHUTOS14398049">
                  <i className="fab fa-twitter-square" />
                  </a>
                  <span>Twitter</span>
                </div>
               
                <div className="contact-social-icon">
                <a href="https://www.instagram.com/ashutoshgiri_official/">
                  <i className="fab fa-instagram" />
                  </a>
                  <span>Instagram</span>
                </div>
               
                <div className="contact-social-icon">
                <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  </a>
                  <span>Email</span>  
                </div>
              </div>
            </div>



          </div>
        </div>

      </div>
    </>
  )
}

export default ContactUs