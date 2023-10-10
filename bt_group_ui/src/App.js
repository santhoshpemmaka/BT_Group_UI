import './App.scss';
import {Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Feedback from './Feedback/Feeback';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import Home from './Home';

function App() {
  return (
      <div className='app-component'>
        <Header />
        {/* Routing concept implementation */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feedback" element={<Feedback/>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
        </Routes>
        <Footer/>
      </div >
  );
}

export default App;
