# Funduseye Projesi

Funduseye, göz hastalıklarının sınıflandırılması için geliştirilmiş bir projedir. Bu proje, görüntü sınıflandırma modelini kullanarak göz hastalıklarını tahmin etmektedir. Proje dört ana bileşenden oluşmaktadır: Model, API, Web Arayüzü ve Mobil Uygulama.

## İçindekiler
- [API](#api)
- [Web Arayüzü](#web-arayüzü)
- [Mobil Uygulama](#mobil-uygulama)
- [Grup Üyeleri](#grup-üyeleri)

## API

### Açıklama
Proje, göz hastalıklarını tahmin etmek için bir API kullanmaktadır. Bu API, Hugging Face üzerinden sunulmaktadır ve eğitilmiş TensorFlow modelini kullanarak görüntü sınıflandırması yapmaktadır.

### Kullanım
API'yi kullanmak için bir POST isteği yapmanız gerekmektedir. İstek, tahmin edilecek göz görüntüsünü içermelidir.

#### Endpoint
- API linki: [https://huggingface.co/spaces/Bitirme/odirapi](https://huggingface.co/spaces/Bitirme/odirapi)

## Web Arayüzü

### Açıklama
Web arayüzü, kullanıcıların göz görüntülerini yükleyerek tahmin almasını sağlar. API'yi kullanarak tahminleri gerçekleştirir. Web arayüzü için Streamlit kullanılmıştır ve Hugging Face üzerinden sunulmaktadır.

### Kullanım
Web arayüzüne erişmek için aşağıdaki linki kullanabilirsiniz:
- Web arayüzü linki: [https://huggingface.co/spaces/Bitirme/odirmodel](https://huggingface.co/spaces/Bitirme/odirmodel)

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
