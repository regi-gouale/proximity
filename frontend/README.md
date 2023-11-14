# Proximity

This project is a simple web application that helps to manage an organisation and its members.

It is build with [Angular](https://angular.io/) and [PocketBase](pocketbase.org).

## Development server

We user Docker commpose to run the development server. To start the server run `docker-compose up` in the root directory of the project. This will start the frontend and backend server. The frontend server will automatically reload if you change any of the source files.

## Build

Run `docker-compose -f docker-compose.prod.yml up` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Deploy

To deploy the application to a server, you can use the `deploy.sh` script. It will build the application and copy the files to the server. You can specify the server in the `deploy.sh` file.
