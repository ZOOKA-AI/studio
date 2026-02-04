# استخدام Node.js كصورة أساسية
FROM node:18-alpine AS base

# تثبيت التبعيات فقط عند الحاجة
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# نسخ ملفات package
COPY package.json package-lock.json* ./
RUN npm ci

# بناء المشروع
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# صورة الإنتاج
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the .next folder
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "start"]
