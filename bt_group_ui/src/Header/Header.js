import React from 'react';
import './Header.scss';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <div className='header-container'>
        <div className='header-component'>
            <div className='header-left-section'>
                <Link to='/'>
                    <h4>BT Group</h4>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Header