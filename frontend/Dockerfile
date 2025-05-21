FROM node:24-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm ci
COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
