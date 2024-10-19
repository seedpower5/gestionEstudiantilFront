# Dockerfile for Angular
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Nginx to serve the Angular application
FROM nginx:alpine
COPY --from=build /app/dist/gestionEstudiantilFront /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
