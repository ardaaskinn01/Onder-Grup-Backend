FROM node:16

RUN npm install -g swaggerhub-cli

WORKDIR /nodeapp

COPY wait-for-it.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for-it.sh

COPY package.json package-lock.json ./
RUN npm install

COPY . .

COPY swagger_update.sh /usr/local/bin/swagger_update.sh
RUN chmod +x /usr/local/bin/swagger_update.sh

EXPOSE 3000

CMD ["sh", "-c", "/usr/local/bin/wait-for-it.sh mysql-container:3306 -- ./swagger_update.sh && npm start"]
