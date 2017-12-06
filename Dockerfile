FROM node:8.9.1-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# ライブラリをインストール
COPY package.json /usr/src/app/
RUN npm install --only=production

EXPOSE 3000
CMD [ "node", "./bin/www.js" ]
