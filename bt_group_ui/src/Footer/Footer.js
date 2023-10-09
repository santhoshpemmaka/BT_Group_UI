import React from 'react'
import './Footer.scss';
const Footer = () => {
  return (
    <div className='footer-container'>
        <div className='footer-component'>
            <h4>&#169; British TeleCommunications {new Date().getFullYear()}</h4>
        </div>
    </div>
  )
}

export default Footer