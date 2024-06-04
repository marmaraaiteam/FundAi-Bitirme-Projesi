import React from 'react';
import '../css/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <h2>Hakkımızda</h2>
      <p>Biz bilgisayar mühendisliği öğrencileriyiz.</p>
      <div className="core-features">
        <div className="feature">
          <h3>Yaren CAN</h3>
          <p>Bilgisayar Mühendisliği Öğrencisi</p>
        </div>
        <div className="feature">
          <h3>Kübra Buzlu</h3>
          <p>Bilgisayar Mühendisliği Öğrencisi</p>
        </div>
        <div className="feature">
          <h3>Hüseyin Taşkın</h3>
          <p>Bilgisayar Mühendisliği Öğrencisi</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
