# FrontTrainProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.

## Run project

<ul>
<li> OPTIONAL STEP: If you need change ip or port go to "src/app/services/GLOBAL.ts" and set up it (default localhost:8034)</li>
<li> Copy all content root directory dist to root server project into a new folder called client/</li>
<li> Structure like that:</li>
        
        project-root/
        │
        ├── tarjet/              
        │   ├── trainproject-0.0.1-SNAPSHOT.jar
        │   └── Dockerfile        
        │
        ├── client/               
        │   ├── src/              
        │   ├── angular.json      
        │   ├── package.json      
        │   ├── Dockerfile            *
        │   ├── nginx-custom.conf     *
        │   ├── etc 
        │
        └── docker-compose.yml    

<li> Create Dockerfile with this content (in client directory):</li>
    
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

<li> Create a nginx-custom.conf (in client directory):</li>

    server {
    listen 80;
    
        root /usr/share/nginx/html;
        index index.html;
    
        location / {
            try_files $uri $uri/ /index.html;
        }
    }

<li> Run docker-compose.yml with this command in terminal y same directory: "docker-compose up"</li>
</ul>
