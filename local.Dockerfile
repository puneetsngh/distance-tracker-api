FROM node:18-alpine

WORKDIR /usr/src/app

RUN npm install -g nodemon

RUN npm install -g typescript

ADD package.json /tmp/package.json
ADD yarn.lock /tmp/yarn.lock
RUN cd /tmp && yarn && \
  mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/