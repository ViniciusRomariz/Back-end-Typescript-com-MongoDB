# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:16-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Create and change to the app directory.
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copy local code to the container image.
COPY . ./

EXPOSE $PORT 80 443

# Run the web service on container startup.
CMD NODE_URLS=http://*:$PORT npm start