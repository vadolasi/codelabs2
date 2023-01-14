FROM node:alpine as base

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i -g pnpm

RUN pnpm i

COPY ./ ./

FROM base as dev

EXPOSE 3000

CMD ["pnpm", "dev"]

FROM base as prod

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
