ARG NODE_VERSION=25-alpine3.22
ARG ALPINE_VERSION=3.23.3
ARG NGINX_TAG=1.29.6-alpine
ARG NGINX_VERSION=1.29.6

# Builder that builds the application application 
FROM node:${NODE_VERSION} AS app-builder
WORKDIR /usr/src/app
COPY package*.json .
COPY gatsby-config.js .
COPY static ./static/
COPY src ./src/
RUN npm install --production;
RUN npm run clean;
RUN npm run build;

# Builder that compiles linked brotli modules
FROM alpine:${ALPINE_VERSION} AS nginx-builder
ARG NGINX_VERSION
RUN apk add --no-cache \
    build-base \
    pcre-dev \
    zlib-dev \
    openssl-dev \
    wget \
    git \
    brotli-dev;
WORKDIR /app
RUN echo "Building nginx version: $NGINX_VERSION" \
    && wget "https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" \
    && tar -zxf "nginx-${NGINX_VERSION}.tar.gz" \
    && ln -s "nginx-${NGINX_VERSION}" nginx \
    && git clone --recurse-submodules -j8 https://github.com/google/ngx_brotli \
    && cd nginx \
    && ./configure --with-compat --add-dynamic-module=../ngx_brotli \
    && make modules;

# Runtime image
FROM nginx:${NGINX_TAG} AS runtime
RUN apk add --no-cache brotli-libs;
RUN touch /var/run/nginx.pid && chown -R nginx:nginx /var/cache/nginx /var/run/nginx.pid;
USER nginx
COPY --from=app-builder --chown=nginx:nginx /usr/src/app/public /usr/share/nginx/html
# COPY --from=nginx-builder /app/nginx/objs/ngx_http_brotli_static_module.so /etc/nginx/modules/
COPY --from=nginx-builder /app/nginx/objs/ngx_http_brotli_filter_module.so /etc/nginx/modules/
COPY --chown=nginx:nginx nginx/server.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
