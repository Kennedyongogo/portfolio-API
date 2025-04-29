FROM node:lts-slim

WORKDIR /usr/app

# Create uploads directory
RUN mkdir -p uploads

COPY package*.json ./
COPY . ./

RUN npm install --silent

EXPOSE 5000
CMD [ "node", "server.js" ]