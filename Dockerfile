FROM node:20-alpine

WORKDIR /usr/src/survey-api

COPY ./package.json .

RUN npm --production install --omit=dev
