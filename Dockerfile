FROM node:20-alpine

COPY package.json /server/

COPY src /server/

WORKDIR /app

RUN npm install

CMD ["node" , "server.js"]