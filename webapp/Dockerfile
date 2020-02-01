FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
COPY ./.npmrc ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx
EXPOSE 4200
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/webapp /usr/share/nginx/html
