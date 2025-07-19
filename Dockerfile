FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY .env.production .env.production
RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile \
    && pnpm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# pnpm 글로벌 설치
RUN npm install -g pnpm

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/.env.production ./.env.production

EXPOSE 3000

CMD ["pnpm", "start"]

