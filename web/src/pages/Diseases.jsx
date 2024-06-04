import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../css/Diseases.css';

// Görsellerin import edilmesi
import ageRelatedMacularDegenerationImage from '../assets/age_related_macular_degeneration.jpg';
import cataractImage from '../assets/cataract.jpg';
import diabetesImage from '../assets/diabetes.jpg';
import glaucomaImage from '../assets/glaucoma.jpg';
import hypertensionImage from '../assets/hypertension.jpg';
import normalImage from '../assets/normal.jpg';
import othersImage from '../assets/others.jpg';
import pathologicalMyopiaImage from '../assets/pathological_myopia.jpg';

const diseasesData = [
  {
    name: 'Age-related Macular Degeneration (Yaşa Bağlı Makula Dejenerasyonu)',
    description: 'Yaşa bağlı makula dejenerasyonu (YBMD), retinanın merkezindeki makulanın hasar görmesi sonucu ortaya çıkar ve merkezi görme kaybına neden olur.',
    symptoms: 'Görme kaybı, bulanık görme, görme alanında karanlık veya boş alanlar.',
    riskFactors: 'Yaş, genetik yatkınlık, sigara içme, yüksek tansiyon, obezite.',
    image: ageRelatedMacularDegenerationImage
  },
  {
    name: 'Katarakt',
    description: 'Göz merceğinin bulutlanması sonucu meydana gelir ve görme kaybına yol açar.',
    symptoms: 'Bulanık görme, gece görüşünde zorluk, renklerin soluk görünmesi.',
    riskFactors: 'Yaşlanma, diyabet, uzun süreli UV ışınlarına maruz kalma, sigara içme.',
    image: cataractImage
  },
  {
    name: 'Diabetes (Diyabet)',
    description: 'Diyabet, gözün küçük kan damarlarında hasara yol açarak diyabetik retinopatiye neden olabilir.',
    symptoms: 'Bulanık görme, aniden görme kaybı, gözde kanamalar.',
    riskFactors: 'Kötü kontrol edilen kan şekeri seviyeleri, uzun süreli diyabet.',
    image: diabetesImage
  },
  {
    name: 'Glaucoma (Glokom)',
    description: 'Glokom, göz içi basıncının artması sonucu optik sinire zarar veren bir hastalıktır.',
    symptoms: 'Görme alanında kayıplar, ilerleyen görme kaybı, ağrısız görme kaybı.',
    riskFactors: 'Yaş, ailede glokom öyküsü, yüksek göz içi basıncı, miyopi.',
    image: glaucomaImage
  },
  {
    name: 'Hypertension (Hipertansiyon)',
    description: 'Yüksek tansiyon gözdeki kan damarlarına zarar vererek hipertansif retinopatiye yol açabilir.',
    symptoms: 'Görme bozuklukları, görme kaybı, gözde kanamalar.',
    riskFactors: 'Kontrolsüz yüksek tansiyon, uzun süreli hipertansiyon.',
    image: hypertensionImage
  },
  {
    name: 'Normal',
    description: 'Fundus muayenesinde herhangi bir patolojik bulguya rastlanmayan, sağlıklı göz yapısı.',
    symptoms: 'Normal görme, retina ve optik sinirde herhangi bir anormallik bulunmaması.',
    riskFactors: 'Yok.',
    image: normalImage
  },
  {
    name: 'Others (Diğerleri)',
    description: 'Yukarıda belirtilen hastalıklar dışında kalan diğer fundus patolojileri.',
    symptoms: 'Hastalığın türüne göre değişkenlik gösterir.',
    riskFactors: 'Hastalığın spesifik sebeplerine bağlı olarak değişir.',
    image: othersImage
  },
  {
    name: 'Pathological Myopia (Patolojik Miyopi)',
    description: 'Yüksek dereceli miyopi sonucu retina ve diğer göz yapılarında hasar meydana gelmesi.',
    symptoms: 'Görme kaybı, retina dekolmanı riski, makula değişiklikleri.',
    riskFactors: 'Genetik yatkınlık, yüksek miyopi dereceleri.',
    image: pathologicalMyopiaImage
  },
];

const Diseases = () => {
  return (
    <Container className="diseases-container my-5">
      <h2 className="text-center mb-4">Hastalıklar</h2>
      <Row className="justify-content-center">
        {diseasesData.map((disease, index) => (
          <Col md={4} className="mb-4" key={index}>
            <Card className="h-100 shadow-card">
              <Card.Body className="text-center">
                <div className="disease-image-container">
                  <img src={disease.image} alt={disease.name} className="disease-image" />
                </div>
                <Card.Title>{disease.name}</Card.Title>
                <Card.Text>{disease.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Diseases;
