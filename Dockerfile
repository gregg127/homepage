FROM bitnami/nginx:1.28.0

USER 0

RUN mkdir -p /homepage

USER 1001

### Modify 'worker_connections' on NGINX config file to '512'
RUN sed -i -r "s#(\s+worker_connections\s+)[0-9]+;#\1512;#" /opt/bitnami/nginx/conf/nginx.conf

COPY public /homepage
COPY nginx/server.conf /opt/bitnami/nginx/conf/server_blocks/server.conf

EXPOSE 8000

USER 1002