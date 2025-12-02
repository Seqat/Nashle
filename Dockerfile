# Multi-stage Dockerfile for building the Vite React app and serving with nginx
FROM node:20.19-alpine AS build
WORKDIR /app

# Copy package files and install dependencies, then build the app
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Add a custom nginx config to support SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
