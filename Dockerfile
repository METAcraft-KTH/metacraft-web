FROM node:22-alpine AS base

WORKDIR /app

RUN corepack enable

FROM base AS build

COPY package.json pnpm-lock.yaml ./

RUN for p in esbuild; do pnpm add $p --allow-build=$p; done && pnpm install

COPY . .

RUN pnpm build

# only what the server imports at runtime (the MySQL driver); the rest is bundled by the build
FROM base AS deps

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod

FROM node:22-alpine
WORKDIR /app

ENV NODE_ENV=production PORT=3000

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY package.json ./

USER node
EXPOSE 3000
CMD ["node", "build"]
