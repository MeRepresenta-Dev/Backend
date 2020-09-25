FROM node:12-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm ci --silent

COPY . . 

EXPOSE 3000

USER node

CMD [ "npm", "start" ]