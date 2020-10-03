FROM node:14

WORKDIR /app

COPY . .

RUN npm i -g yarn

RUN yarn

CMD [ "node", "src/index.js" ]
