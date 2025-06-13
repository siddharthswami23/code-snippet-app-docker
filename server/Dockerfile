FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

COPY .env .env

EXPOSE 5000

CMD ["node", "server.js"]
