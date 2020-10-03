FROM node:14

WORKDIR /app

COPY . .

RUN yarn

CMD [ "node", "src/index.js" ]
