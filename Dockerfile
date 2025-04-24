FROM node:lts-slim

WORKDIR /usr/app
COPY package*.json ./
COPY . ./

RUN npm install --silent

EXPOSE 3003
CMD [ "node", "server.js" ]