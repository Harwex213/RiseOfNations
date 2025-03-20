FROM node:16 as build

ENV NODE_ENV=production

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY ../packages/rise-of-nations-frontend .

RUN npm run build

FROM nginx:latest as production

COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
