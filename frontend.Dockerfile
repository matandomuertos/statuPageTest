FROM node:lts-alpine3.16 as builder

WORKDIR /usr/src/app

COPY --chown=node:node frontend/ ./

RUN npm run build


FROM node:lts-alpine3.16 AS builder

ENV NODE_ENV prod

WORKDIR /app

COPY frontend/ .

RUN npm install

RUN npm run build



FROM nginx:1.21.0-alpine as production

ENV NODE_ENV prod

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]