import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import AboutUs from './pages/AboutUs';  
import Header from './components/Header';
import './css/Main.css';
import Diseases from './pages/Diseases';


const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/about" element={<AboutUs />} />  
        <Route path="/diseases" element={<Diseases/>} />
        <Route path="/get-started" element={<Upload/>} />
        <Route path="/learn-more" element={<div>Learn More</div>} />
      </Routes>
      </>
  );
};

export default App;