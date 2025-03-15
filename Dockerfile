FROM node:lts-alpine3.18 AS base

ENV MODE=dev

RUN mkdir -p /ftso/webapp

WORKDIR /ftso/webapp

#COPY package.json ./

COPY . .

COPY /certs /etc/nginx/certs

RUN yarn install

#COPY tsconfig.json tsconfig.spec.json next.config.js tailwind.config.ts  ./

# TEST
RUN rm -rf .next
RUN yarn build


# Installa Nginx
RUN apk add --no-cache nginx
RUN mkdir -p /var/www/nextjs

RUN mkdir -p /etc/nginx/ && touch /etc/nginx/nginx.conf

# Scrive una configurazione base in /etc/nginx/nginx.conf
RUN echo " \
    user nginx; \
    worker_processes auto; \
    error_log /var/log/nginx/error.log warn; \
    pid /var/run/nginx.pid; \
    events { worker_connections 1024; } \
    http { \
    include /etc/nginx/mime.types; \
    default_type application/octet-stream; \
    sendfile on; \
    keepalive_timeout 65; \
    include /etc/nginx/conf.d/*.conf; \
    }" > /etc/nginx/nginx.conf

COPY nginx-next.conf /etc/nginx/conf.d/default.conf
#COPY out /var/www/nextjs
RUN cp -r /ftso/webapp/out/* /var/www/nextjs
EXPOSE 3000
CMD ["sh", "-c", "if [ \"$MODE\" = \"prod\" ]; then exec nginx -g 'daemon off;'; else exec yarn dev; fi"]
#CMD ["nginx", "-g", "daemon off;"]


# TEST END

# working as it is
#EXPOSE 3000
#CMD ["yarn", "dev"]
