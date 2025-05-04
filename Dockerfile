FROM nginxinc/nginx-unprivileged:1.27.4

COPY public /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]