FROM node:21-alpine3.18 AS base

WORKDIR /app

FROM base AS build

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm i

COPY . .

RUN pnpm build

FROM base

COPY package.json /app/
COPY --from=build /app/build /app/build

ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
CMD ["node", "build/index.js"]
