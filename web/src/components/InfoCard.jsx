import React from 'react';
import '../css/InfoCard.css';

const InfoCard = React.forwardRef((props, ref) => {
  return (
    <div className="info-container" ref={ref}>

      <div className="info-card">
        <h3>Neden Erken Teşhis Önemlidir?</h3>
        <p><strong>Görme Yetinizi Koruyun:</strong> Birçok göz hastalığı, erken dönemde tespit edilip tedavi edildiğinde kalıcı hasarların önüne geçilebilir.</p>
        <p><strong>Yaşam Kalitenizi Artırın:</strong> Erken teşhis sayesinde, günlük aktivitelerinizi kesintisiz sürdürebilir ve bağımsızlığınızı koruyabilirsiniz.</p>
        <p><strong>Ekonomik Avantajlar:</strong> İlerleyen dönemlerde gerekecek pahalı ve karmaşık tedavilerden kaçınarak hem kendiniz hem de sağlık sistemleri için tasarruf sağlayabilirsiniz.</p>
      </div>
      <div className="info-card">
        <h3>Web Sitemizin Önemi</h3>
        <p><strong>Kolay Erişim:</strong> Her yaştan ve her kesimden insanın göz sağlığı hakkında bilgiye kolayca erişebilmesi için tasarlandı.</p>
        <p><strong>Bilgilendirme ve Eğitim:</strong> Kullanıcıların göz hastalıkları hakkında bilinçlenmesini sağlamak için detaylı ve anlaşılır bilgiler sunuyoruz.</p>
        <p><strong>Teknolojik Destek:</strong> Geliştirdiğimiz sınıflandırma modeli ile kullanıcılar, olası göz rahatsızlıklarını erken dönemde tespit edebilir ve gerekli önlemleri alabilir.</p>
        <p>Göz sağlığınıza önem verin ve düzenli göz kontrolleri ile sağlıklı bir yaşam sürdürün. Hemen şimdi başlayın ve göz sağlığınız için ilk adımı atın.</p>
      </div>
    </div>
  );
});

export default InfoCard;
