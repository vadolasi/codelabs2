FROM node:alpine as base

WORKDIR /usr/src/app

COPY package.json ./

RUN apk update && apk upgrade && apk add --no-cache git libc6-compat
RUN ln -s /lib/libc.musl-x86_64.so.1 /lib/ld-linux-x86-64.so.2

RUN npm i -g pnpm

RUN pnpm i

COPY ./ ./

FROM base as dev

EXPOSE 8000

CMD ["pnpm", "start:dev"]

FROM base as prod

RUN ["pnpm", "start:prod"]
