FROM node:25-alpine3.23 AS base

WORKDIR /app

FROM base AS build

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm i

COPY . .

RUN pnpm build

FROM busybox:1-musl
WORKDIR /app

RUN echo "E404:/app/404.html" > /httpd.conf
COPY --from=build /app/build /app

EXPOSE 3000
CMD ["httpd", "-fp3000", "-c/httpd.conf"]
