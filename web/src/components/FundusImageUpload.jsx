import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import '../css/ImageUpload.css';

const FundusImageUpload = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedModel, setSelectedModel] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const models = ["5 Sınıflı Xception", "6 Sınıflı Xception", "Xception"];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png, image/jpg',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImagePreview(URL.createObjectURL(file));
      resizeImage(file, (resizedFile) => {
        setFile(resizedFile);
      });
    },
  });

  const resizeImage = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxSize = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(callback, 'image/jpeg', 1);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Lütfen önce bir dosya seçin!');
      return;
    }

    if (!selectedModel) {
      alert('Lütfen önce bir model seçin!');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file, 'image.jpg');

    try {
      const response = await axios.post('https://bitirme-odirapi.hf.space/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data); // API yanıtını kontrol et

      const predictionResult = response.data[selectedModel];
      setPrediction(`${predictionResult.class} (Olasılık: ${(predictionResult.probability * 100).toFixed(2)}%)`);
    } catch (error) {
      console.error('Resim yüklenirken hata:', error);
      alert('Resim yüklenirken hata oluştu');
    }

    setIsLoading(false);
  };

  const handleClear = () => {
    setFile(null);
    setPrediction('');
    setImagePreview(null);
  };

  return (
    <div className="upload-container">
      <h1 className="title">Göz Hastalığı Tahmini</h1>
      <select className="form-select form-select-lg mb-3" value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
        <option value="">Model Seçiniz</option>
        {models.map((model) => (
          <option key={model} value={model}>{model}</option>
        ))}
      </select>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Dosyaları buraya bırakın ...</p>
        ) : (
          <div>
            {imagePreview ? (
              <div className="preview-container">
                <img src={imagePreview} alt="Önizleme" className="image-preview" />
                <button onClick={handleClear} className="clear-button">X</button>
              </div>
            ) : (
              <p>Dosyayı buraya sürükleyip bırakın veya dosya seçmek için tıklayın</p>
            )}
          </div>
        )}
      </div>
      <button onClick={handleUpload} className="upload-button" disabled={isLoading}>
        {isLoading ? 'Yükleniyor...' : 'Resmi Yükle'}
      </button>
      {prediction && (
        <div className="prediction-result">
          <h3>Tahmin Sonucu</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default FundusImageUpload;
