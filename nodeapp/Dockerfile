# Node.js tabanlı bir imajı kullan
FROM node:latest

# Global olarak swaggerhub-cli'ı yükle
RUN npm install -g swaggerhub-cli

# Çalışma dizinini belirle
WORKDIR /nodeapp

# wait-for-it.sh dosyasını kopyalayın ve yürütme izni verin
COPY wait-for-it.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for-it.sh

# package.json ve package-lock.json dosyalarını kopyala ve bağımlılıkları yükle
COPY package*.json ./
RUN npm install

# Uygulama dosyalarını kopyala
COPY . .

# swagger_update.sh dosyasını kopyala ve çalıştırılabilir hale getir
COPY swagger_update.sh /usr/local/bin/swagger_update.sh
RUN chmod +x /usr/local/bin/swagger_update.sh

# Uygulamayı başlat
CMD ["sh", "-c", "/usr/local/bin/wait-for-it.sh mysql-container:3306 -- ./swagger_update.sh && npm start"]

# EXPOSE komutunu buraya eklemeyi unutmayın
EXPOSE 3000