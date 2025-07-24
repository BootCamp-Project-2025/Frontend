FROM node:22-alpine3.21 AS build

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . /app/

RUN npm run build



FROM nginx:1.27.5-alpine AS server

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.prod.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
