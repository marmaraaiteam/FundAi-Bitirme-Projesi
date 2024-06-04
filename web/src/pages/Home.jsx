import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Main.css';
import FundusImage from '../assets/giris.png';
import Header from '../components/Header';
import InfoCard from '../components/InfoCard';

const Home = () => {
  const navigate = useNavigate();
  const infoRef = useRef(null);

  const handleGetStartedClick = () => {
    navigate('/upload');
  };

  const smoothScrollTo = (target, duration) => {
    const start = window.pageYOffset;
    const end = target.current.offsetTop;
    const distance = end - start;
    const startTime = performance.now();

    const easeInOutQuad = (t) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const scroll = (currentTime) => {
      const timeElapsed = currentTime - startTime;
      const progress = timeElapsed / duration;
      const ease = easeInOutQuad(progress);

      window.scrollTo(0, start + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  const handleReadMoreClick = () => {
    smoothScrollTo(infoRef, 2000); // 2000ms = 2s, kaydırma süresini artırarak hızını düşürüyoruz
  };

  return (
    <div>
      <main className="main">
        <div className="content">
          <div className="text-content">
            <div className="links">
              <a href="mailto:marmaraaiteam@gmail.com.tr">Bizimle İletişime Geçin</a>
            </div>
            <h2>Göz Hastalıkları Sınıflandırma</h2>
            <p>Göz hastalıklarını erken teşhis ederek, yaşam kalitenizi artırın ve sağlıklı bir geleceğe adım atın. Göz sağlığınız için şimdi harekete geçin.</p>
            <div className="buttons">
              <button className="get-started" onClick={handleGetStartedClick}>Başla</button>
              <button className="read-more" onClick={handleReadMoreClick}>Okumaya Devam Et</button>
            </div>
          </div>
          <div className="image-content">
            <img src={FundusImage} alt="Eye Care" />
          </div>
        </div>
      </main>
      <InfoCard ref={infoRef} />
    </div>
  );
};

export default Home;
