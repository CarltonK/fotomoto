# Stage 1 - Clean Install
FROM node:22.8-alpine AS base

WORKDIR /app
COPY package*.json ./

RUN npm install --only=production \
    && npm cache clean --force

# Stage 2: Build
FROM base AS build
WORKDIR /app

# Copy the app files
COPY . .

# Build the app
RUN npm run build

# Stage 3: Production
FROM node:22.8-alpine AS production
WORKDIR /app

# Copy only the built files and production deps
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

CMD ["node", "dist/main"]
