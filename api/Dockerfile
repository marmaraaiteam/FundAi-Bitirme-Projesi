FROM python:3.9-slim

# OpenCV için gerekli olan bağımlılıkları yükleyin
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0

# Çalışma dizinini oluştur
WORKDIR /app

# Gereksinimler dosyasını kopyala ve gerekli paketleri yükle
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Uygulama dosyasını kopyala
COPY . .

# Uygulama başlatma komutu
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "7860"]
