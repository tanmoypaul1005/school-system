FROM node:20-bookworm-slim AS base

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npx prisma generate

COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src

FROM base AS dev

ENV NODE_ENV=development
EXPOSE 3000

CMD ["npm", "run", "start:dev"]

FROM base AS prod

RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main"]
