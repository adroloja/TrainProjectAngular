# Step 1: Build the Angular application
FROM node:latest as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the application with Nginx
FROM nginx:1.19.0-alpine
COPY --from=build /app/dist/front-train-project /usr/share/nginx/html
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf
