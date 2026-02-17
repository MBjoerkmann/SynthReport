# --- Stage 1: Install dependencies and build ---
FROM oven/bun:1 AS build
WORKDIR /usr/src/app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

ARG NEXT_PUBLIC_API_URL=""
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN bun run build

# --- Stage 2: Production image ---
FROM oven/bun:1-slim AS release
WORKDIR /usr/src/app

# Copy the standalone server and static assets
COPY --from=build /usr/src/app/.next/standalone ./
COPY --from=build /usr/src/app/.next/static ./.next/static
COPY --from=build /usr/src/app/public ./public

USER bun
EXPOSE 3000/tcp

ENV HOSTNAME=0.0.0.0
ENV PORT=3000

CMD ["bun", "server.js"]
