FROM node:lts-alpine3.10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json ./package.json

RUN npm install
RUN npm install -g nodemon

COPY . /usr/src/app

EXPOSE 3000

CMD ["npm" ,"run", "dev"]
