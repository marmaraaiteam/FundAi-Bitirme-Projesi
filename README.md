# Funduseye Projesi

Funduseye, göz hastalıklarının sınıflandırılması için geliştirilmiş bir projedir. Bu proje, görüntü sınıflandırma modelini kullanarak göz hastalıklarını tahmin etmektedir. Proje dört ana bileşenden oluşmaktadır: Model, API, Web Arayüzü ve Mobil Uygulama.

## İçindekiler
- [Model](#model)
- [Sentetik Veri Üretimi](#sentetik-veri-üretimi)
- [API](#api)
- [Web Arayüzü](#web-arayüzü)
- [Mobil Uygulama](#mobil-uygulama)
- [Grup Üyeleri](#grup-üyeleri)

## Model
Proje kapsamında DenseNet121, InceptionV3, Xception ve MobileNetV2 modelleri eğitilmiştir. Verilerin ön işlenmesi, Gaussian Filtre ve CLAHE Filtresi, geleneksel yöntemlerle veri çoğaltılması ve modellerin eğitim-test kodlarına src dizininden erişilebilir.

## Sentetik Veri Üretimi
Proje kapsamında sentetik veri üretimi için StyleGAN2-ADA modeli kullanılmıştır. 
StyleGAN2-ADA modeline ait kodlara linkten erişilebilir: [https://github.com/NVlabs/stylegan2-ada-pytorch](https://github.com/NVlabs/stylegan2-ada-pytorch)

## API

### Açıklama
Proje, göz hastalıklarını tahmin etmek için bir API kullanmaktadır. Bu API, Hugging Face üzerinden sunulmaktadır ve eğitilmiş TensorFlow modelini kullanarak görüntü sınıflandırması yapmaktadır.

### Kullanım
API'yi kullanmak için bir POST isteği yapmanız gerekmektedir. İstek, tahmin edilecek göz görüntüsünü içermelidir.

#### Endpoint
- API linki: [https://huggingface.co/spaces/Bitirme/odirapi](https://huggingface.co/spaces/Bitirme/odirapi)

## Web Arayüzü

### Açıklama
Web arayüzü, kullanıcıların göz görüntülerini yükleyerek tahmin almasını sağlar. API'yi kullanarak tahminleri gerçekleştirir. Web arayüzü için Vite ve React kullanılmıştır ve Netlify üzerinden web sitesi yayınlanmıştır.

### Kullanım
Web arayüzüne erişmek için aşağıdaki linki kullanabilirsiniz:
- Web arayüzü linki: [https://fundai.netlify.app/](https://fundai.netlify.app/)

## Mobil Uygulama

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
