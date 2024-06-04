import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';
import logo from '../assets/funduslogo.jpeg';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="EyeDetect Logo" />
          <h1>FundAi</h1>
        </Link>
      </div>
      <nav className="nav">
        <Link to="/about">Hakkımızda</Link>
        <Link to="/diseases">Hastalıklar</Link>
        <Link to="/get-started" className="get-started">Başla</Link>
      </nav>
    </header>
  );
};

export default Header;
