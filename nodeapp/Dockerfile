FROM node:16

WORKDIR /usr/src/app

COPY wait-for-it.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for-it.sh

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "/usr/local/bin/wait-for-it.sh mysql-container:3306 && npm start"]
