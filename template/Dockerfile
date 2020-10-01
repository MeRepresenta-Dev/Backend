FROM node:12.16-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci --silent

COPY . ./

CMD ["npm", "start"]

USER node

EXPOSE 3000
