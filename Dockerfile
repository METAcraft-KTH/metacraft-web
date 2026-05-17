FROM node:22-alpine AS base

WORKDIR /app

FROM base AS build

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN for p in esbuild; do pnpm add $p --allow-build=$p; done && pnpm install

COPY . .

RUN pnpm build

FROM busybox:1-musl
WORKDIR /app

RUN echo "E404:/app/404.html" > /httpd.conf
COPY --from=build /app/build /app

EXPOSE 3000
CMD ["httpd", "-fp3000", "-c/httpd.conf"]
