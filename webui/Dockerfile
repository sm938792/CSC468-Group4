FROM ubuntu
#install needed
RUN sudo apt-get update
RUN sudo apt-get install nginx
#copy files to nginx folder
COPY site/app.js /usr/share/nginx/www 
COPY site/index.html /usr/share/nginx/www
COPY site/main.css /usr/share/nginx/www
COPY site/nginx.conf /etc/nginx
#start nginx service
RUN sudo systemctl start nginx.service
