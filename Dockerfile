FROM node:20.19-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci --force
COPY . .
RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache curl

# Copier les fichiers buildés
COPY --from=build /app/dist/gestionhabilitation/browser /usr/share/nginx/html

# Copier env.js de la racine vers src/assets/
COPY env.js /usr/share/nginx/html/assets/env.js

COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]