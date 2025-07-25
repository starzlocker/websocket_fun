FROM node:alpine

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

RUN ls -la

CMD [ "npm", "run", "dev" ]