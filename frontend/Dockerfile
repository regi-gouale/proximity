# Stage 1: Build frontend
FROM node:18.10.0 as build-stage
WORKDIR /app/
COPY ./package*.json /app/
COPY ./package*.json /app/
RUN npm ci
COPY ./ /app/

# RUN npm run build -- --output-path=./dist/out --output-hashing=all
RUN npm serve

# Stage 2: Serve it using Ngnix
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf