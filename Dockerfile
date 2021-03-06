FROM node:16-alpine as build

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

COPY . ./

RUN yarn 







RUN yarn build


FROM nginx:1.12-alpine as production
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
