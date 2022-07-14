# MERN Status page

Basic status page created using [MERN](https://www.mongodb.com/mern-stack).

## How to build images

### MongoDB

Using public images

### Backend

`docker build -f backend.Dockerfile -t matandomuertos/mern-backend .`

### Frontend

`docker build -f frontend.Dockerfile -t matandomuertos/mern-frontend .`

## How to deploy it

Clone the repo and run `docker-compose up -d`

## How it works

When the app is already deployed a cronjob in the backend will check the domains in MongoDB and check if they are active or not.

## Add domains to the database

Import `mern.postman_collecion.json` to postman and add a domain (with name and url (ex: http://qwer.com) as body parameters).

## Components

### MongoDB

Nothing special, standard MongoDB from internet with port `27017` exported to be able to connect from MongoDB Compass or whatever other client

### Backend

Nodejs backend used to create the API that connects to MongoDB and shows the results as http.
It uses express (with cors) as web server and mongoose to connect to MongoDB.

### Frontend

React frontend with some [MUI](https://mui.com/components/) elements to make UI "easier" to create.
It uses axion to connect to the backend API, and nginx as web server in the docker image.