FROM node:lts-alpine

ARG JWT_SECRET
ARG DATABASE_HOST

ENV JWT_SECRET=${JWT_SECRET} \
    DATABASE_HOST=${DATABASE_HOST}

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD npm start
