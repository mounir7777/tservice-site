# Stage 1: static files already exist in ./public
FROM nginx:alpine
COPY public/ /usr/share/nginx/html/
# Nginx hört standardmäßig auf 80; keine CMD nötig
