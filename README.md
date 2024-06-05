# FundAi Projesi

FundAi, göz hastalıklarının sınıflandırılması için geliştirilmiş bir projedir. Bu proje, görüntü sınıflandırma modelini kullanarak göz hastalıklarını tahmin etmektedir. Proje dört ana bileşenden oluşmaktadır: Model, API, Web Arayüzü ve Mobil Uygulama.

## İçindekiler
- [Model](#model)
- [Sentetik Veri Üretimi](#sentetik-veri-üretimi)
- [API](#api)
- [Web Arayüzü](#web-arayüzü)
- [Mobil Uygulama](#mobil-uygulama)
- [Grup Üyeleri](#grup-üyeleri)

## Model

![image](https://github.com/marmaraaiteam/FundAi-Bitirme-Projesi/assets/101792656/863bbb6b-bb74-4ef0-b7ef-606454b641e4)

Proje kapsamında DenseNet121, InceptionV3, Xception ve MobileNetV2 modelleri eğitilmiştir. Verilerin ön işlenmesi, Gaussian Filtre ve CLAHE Filtresi, geleneksel yöntemlerle veri çoğaltılması ve modellerin eğitim-test kodlarına src dizininden erişilebilir.


### Verilerin Geleneksel Yöntemlerle Çoğaltılması:


![image](https://github.com/marmaraaiteam/FundAi-Bitirme-Projesi/assets/101792656/8b572629-cf03-4e87-8748-40ef8d2ea024)


### Gaussian Filtresi:


![image](https://github.com/marmaraaiteam/FundAi-Bitirme-Projesi/assets/101792656/fbc8a9b7-d6a2-4eea-b341-183e215b27b8)


### CLAHE Filtresi:


![image](https://github.com/marmaraaiteam/FundAi-Bitirme-Projesi/assets/101792656/948b8cf0-af1d-444e-b8bd-1b4af54ab7dd)


## Sentetik Veri Üretimi

![image](https://github.com/marmaraaiteam/FundAi-Bitirme-Projesi/assets/101792656/d8f0be89-2212-4afe-b2e3-34e65c3a7a24)


Proje kapsamında sentetik veri üretimi için StyleGAN2-ADA modeli kullanılmıştır. 
StyleGAN2-ADA modeline ait kodlara linkten erişilebilir: [https://github.com/NVlabs/stylegan2-ada-pytorch](https://github.com/NVlabs/stylegan2-ada-pytorch)

## API

![image](https://github.com/marmaraaiteam/FundAi-Bitirme-Projesi/assets/101792656/d04e10c8-ac29-472b-80bc-873e0c74f3e1)

### Açıklama
Proje, göz hastalıklarını tahmin etmek için bir API kullanmaktadır. Bu API, Hugging Face üzerinden sunulmaktadır ve eğitilmiş TensorFlow modelini kullanarak görüntü sınıflandırması yapmaktadır.

### Kullanım
API'yi kullanmak için bir POST isteği yapmanız gerekmektedir. İstek, tahmin edilecek göz görüntüsünü içermelidir.

#### Endpoint
- API linki: [https://huggingface.co/spaces/Bitirme/odirapi](https://huggingface.co/spaces/Bitirme/odirapi)

## Web Arayüzü

![image](https://github.com/marmaraaiteam/FundAi-Bitirme-Projesi/assets/101792656/9090e800-7a33-4ad8-b6ca-fc59c4163130)

![image](https://github.com/marmaraaiteam/FundAi-Bitirme-Projesi/assets/101792656/bc385e1d-9460-4304-865a-7c290705d89d)

### Açıklama
Web arayüzü, kullanıcıların göz görüntülerini yükleyerek tahmin almasını sağlar. API'yi kullanarak tahminleri gerçekleştirir. Web arayüzü için Vite ve React kullanılmıştır ve Netlify üzerinden web sitesi yayınlanmıştır.

### Kullanım
Web arayüzüne erişmek için aşağıdaki linki kullanabilirsiniz:
- Web arayüzü linki: [https://fundai.netlify.app/](https://fundai.netlify.app/)

## Mobil Uygulama

![image](https://github.com/marmaraaiteam/FundAi-Bitirme-Projesi/assets/101792656/2867ab82-46d1-4ffb-9cf1-ec18bbfd7411)


### Açıklama
Projenin mobil uygulaması, kullanıcıların göz görüntülerini yükleyerek hastalık tahmini almasını sağlamaktadır. Uygulama, API'ye istek göndererek sonucu kullanıcıya göstermektedir.

### Kullanım
1. Mobil uygulamayı açın.
2. Göz görüntüsünü yükleyin.
4. Tahmin edilen sınıfı ve olasılığı görüntüleyin.

## Grup Üyeleri
- Yaren Can
- Kübra Buzlu
- Hüseyin Taşkın
