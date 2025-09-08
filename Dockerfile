FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache curl

# Copier les fichiers buildés
COPY --from=build /app/dist/gestion-habilitation-frontend /usr/share/nginx/html

# Configuration Nginx
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]