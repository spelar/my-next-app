# 1) 의존성 설치
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile

# 2) 빌드 (Next.js standalone 산출물 생성)
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY .env.production .env.production
RUN npm install -g pnpm \
    && pnpm run build

# 3) 실행 - standalone 산출물만 복사(pnpm .pnpm 하드링크 스토어 미포함 → 레이어 추출 문제 원천 제거)
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# standalone 서버가 모든 인터페이스에서 수신하도록(컨테이너 포트 매핑 정상화)
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# KAKAO_API_KEY는 런타임 주입(docker run -e) — 이미지에 굽지 않음
CMD ["node", "server.js"]
