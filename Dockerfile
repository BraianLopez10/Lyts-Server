FROM node:14.15.4-alpine3.10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json ./package.json

RUN npm install
RUN npm install -g nodemon

COPY . /usr/src/app

CMD ["npm" ,"run", "dev"]
