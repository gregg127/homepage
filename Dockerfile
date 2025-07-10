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
# Copy NGINX configuration file
COPY nginx/nginx.conf /opt/bitnami/nginx/conf/nginx.conf
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