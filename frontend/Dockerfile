# Stage 1: Build frontend
FROM node:18.13.0 as build-stage
WORKDIR /app/
COPY ./package*.json /app/
COPY ./package*.json /app/
RUN npm ci
COPY ./ /app/

# Install Angular CLI
RUN npm install -g @angular/cli

# Build the app
# RUN ng serve --host 0.0.0.0 --disableHostCheck
# RUN npm run build -- --output-path=./dist/out --output-hashing=all
# RUN npm run serve -- --output-path=./dist/out --output-hashing=all

# Stage 2: Serve it using Ngnix
# FROM nginx:stable-alpine
# COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf