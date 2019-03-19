FROM ubuntu:18.04
MAINTAINER Jada Jin



# Update image and install required packages
# Install.
RUN apt-get -y update && \
apt-get -y upgrade && \
apt-get install -y nano vim screen wget autossh git curl sudo npm

#Nodejs
RUN curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash - \
&& apt-get install -y nodejs

WORKDIR /
RUN git clone -b create_docker https://github.com/iobond/emupay.git

WORKDIR /emupay
RUN rm -rf package-lock.json
RUN npm install
RUN npm run apply:copay
RUN npm run ionic:serve
RUN npm run ionic:build --prod

EXPOSE 8100
# WORKDIR /emupay
# CMD npm run ionic:serve
# Make port 8100 available to the world outside this container
