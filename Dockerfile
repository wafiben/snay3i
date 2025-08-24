# -----------------------
# 1. Build Stage
# -----------------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy all source files
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# -----------------------
# 2. Production/Runtime Stage
# -----------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only package.json and install production deps
COPY package*.json ./
RUN npm install --only=production

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Set environment variables defaults (can be overridden by Docker run)
ENV PORT=3000
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=postgres
ENV DB_NAME=mydb

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]

