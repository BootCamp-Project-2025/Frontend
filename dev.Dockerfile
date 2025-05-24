FROM node:22-alpine3.21

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . /app/

CMD [ "npm", "run", "dev:public" ]

EXPOSE 5173