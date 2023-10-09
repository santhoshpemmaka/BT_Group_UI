import React from 'react';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const guestHandler = () => {
    navigate('/feedback');
  }
  const adminHandler = () => {
    navigate('/login');
  }
  return (
    <div className='home-container'>
        <h2 className='home-title'>Welcome to the BT Group</h2>
        <h2 className='home-login-title'>Are you login as?</h2>
        <div className='login-btns'>
            <button className='guest-btn' onClick={() => guestHandler()}>Guest</button>
            <button className='admin-btn' onClick={() => adminHandler()}>Admin</button>
        </div>
    </div>
  )
}

export default Home