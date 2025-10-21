FROM node:24 AS base

WORKDIR /usr/src/app

# Copy workspace files first
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY config/ ./config/

# Install pnpm and nestjs-cli
RUN npm install -g pnpm @nestjs/cli

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build packages first
RUN cd packages/rabbitmq && npm run build

# Development stage
FROM base AS development
COPY apps/api-gateway/ ./apps/api-gateway/
WORKDIR /usr/src/app/apps/api-gateway
RUN pnpm install
EXPOSE 3001
CMD ["npm", "run", "start:dev"]

# Production stage
FROM base AS production
COPY apps/api-gateway/ ./apps/api-gateway/
WORKDIR /usr/src/app/apps/api-gateway
RUN pnpm install
RUN npm run build
EXPOSE 3001
CMD ["node", "dist/main"]