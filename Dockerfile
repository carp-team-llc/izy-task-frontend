# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./

RUN npm cache clean --force
RUN npm install

COPY . .

ENV NODE_ENV development

USER root

EXPOSE 5173

CMD ["npx", "cross-env", "NODE_ENV=development", "vite"]
