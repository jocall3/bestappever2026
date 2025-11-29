# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Enable corepack to manage pnpm version
RUN corepack enable

# Copy root package.json and lockfile
COPY package.json pnpm-lock.yaml ./

# Copy workspace config
COPY pnpm-workspace.yaml ./

# Copy app-specific package.json
COPY packages/apps/web/package.json ./packages/apps/web/

# Install all dependencies
RUN pnpm install --filter @bestappever2026/web... --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the production bundle for the web app
RUN pnpm --filter @bestappever2026/web build

# Stage 2: Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production

# Copy the standalone output from the builder stage
COPY --from=builder /app/packages/apps/web/.next/standalone/ .

# Copy the public and static assets
COPY --from=builder /app/packages/apps/web/public ./packages/apps/web/public
COPY --from=builder /app/packages/apps/web/.next/static ./packages/apps/web/.next/static

# Expose the port the app runs on
EXPOSE 3000

# Start the server
CMD ["node", "packages/apps/web/server.js"]