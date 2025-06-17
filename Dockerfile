ARG NGINX_VERSION=1.28.0
ARG BITNAMI_NGINX_REVISION=r0
ARG BITNAMI_NGINX_TAG=${NGINX_VERSION}-debian-12-${BITNAMI_NGINX_REVISION}

FROM bitnami/nginx:${BITNAMI_NGINX_TAG} AS builder
USER root
# Redeclare NGINX_VERSION so it can be used as a parameter inside this build stage
ARG NGINX_VERSION
# Install required packages and build dependencies
RUN apt update && \
    apt upgrade -y && \
    apt install -y libpcre3 libpcre3-dev zlib1g zlib1g-dev openssl libssl-dev wget git make libbrotli-dev curl build-essential
# Download NGINX, extract and clone ngx_brotli repository
RUN cd /tmp && \
    curl -O http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz && \
    tar xzf nginx-${NGINX_VERSION}.tar.gz && \
    git clone --recurse-submodules -j8 https://github.com/google/ngx_brotli
# Compile NGINX with desired module
RUN cd /tmp/nginx-${NGINX_VERSION} && \
    rm -rf /opt/bitnami/nginx && \
    ./configure --prefix=/opt/bitnami/nginx --with-compat --add-dynamic-module=/tmp/ngx_brotli && \
    make && \
    make install

FROM bitnami/nginx:${BITNAMI_NGINX_TAG}
USER root
RUN apt update && \
    apt upgrade -y && \
    apt install -y libbrotli-dev
# Copy brotli module from builder
COPY --from=builder /opt/bitnami/nginx/modules/ngx_http_brotli_filter_module.so /opt/bitnami/nginx/modules/ngx_http_brotli_filter_module.so
# Enable brotli module
RUN sed -i '/worker_processes/aload_module modules/ngx_http_brotli_filter_module.so;' /opt/bitnami/nginx/conf/nginx.conf
# Replace 'gzip' with 'brotli' compression
RUN sed -i -r "s#(\s+)gzip(\s+)on;#\1brotli\2on;#" /opt/bitnami/nginx/conf/nginx.conf
RUN sed -i "/gzip_http_version/d" /opt/bitnami/nginx/conf/nginx.conf
RUN sed -i -r "s#(\s+)gzip_comp_level(\s+).*;#\1brotli_comp_level\24;#" /opt/bitnami/nginx/conf/nginx.conf
RUN sed -i "/gzip_proxied/d" /opt/bitnami/nginx/conf/nginx.conf
RUN sed -i -r "s#(\s+)gzip_types(\s+).*;#\1brotli_types\2text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;#" /opt/bitnami/nginx/conf/nginx.conf
# Modify 'worker_connections' on NGINX config file to '512'
RUN sed -i -r "s#(\s+worker_connections\s+)[0-9]+;#\1512;#" /opt/bitnami/nginx/conf/nginx.conf
# Copy homepage server block configuration
COPY nginx/server.conf /opt/bitnami/nginx/conf/server_blocks/server.conf
# Create a directory for the homepage static files
RUN mkdir -p /homepage
# Copy homepage static files
COPY public /homepage
# Expose port
EXPOSE 8000
# Set the container to be run as a non-root user by default
USER 1001