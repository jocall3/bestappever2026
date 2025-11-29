ARG NODE_VERSION=18
ARG ALPINE_VERSION=3.18

# Stage 1: Build the frontend application
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock (or package-lock.json if using npm)
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the production bundle
# Assuming a standard React/Vue/Next/etc. setup that uses a build script
RUN yarn build

# Stage 2: Serve the frontend application using Nginx for production
FROM nginx:stable-alpine

# Copy the built assets from the builder stage to Nginx's web root
COPY --from=builder /app/build /usr/share/nginx/html

# Copy a custom Nginx configuration file for optimal serving (e.g., handling client-side routing)
# We assume a file named 'nginx.conf' exists in the root of the project that handles SPA routing fallback.
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the container
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]