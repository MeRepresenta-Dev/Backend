FROM node:12-alpine as builder

RUN apk add --no-cache python make g++

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY --from=builder node_modules .

COPY . . 

EXPOSE 3000

USER node

CMD [ "npm", "start" ]