FROM ubuntu:16.04

MAINTAINER Farhad Ghasemi "farhadd7.ghasemi@gmail.com"

ENV TZ=Asia/Tehran

#Instalation
RUN apt-get update && apt-get install -y curl vim \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && curl https://deb.nodesource.com/setup_10.x | bash \
    && apt-get update && apt-get install -yq  tzdata nodejs \
    && npm install pm2@4.2.1 -g \
    && mkdir /var/www/ /var/www/scratch

# Change TimeZone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata

# Copy entrypoint
COPY entrypoint.sh /
COPY optimize_bundles.sh /

# Copy Project Files
COPY . /var/www

# Get and compile requirement
RUN cd /var/www

# Define working directory.
WORKDIR /var/www/

# Install Dependencies
RUN npm install && chmod +x /entrypoint.sh
RUN chmod +x /optimize_bundles.sh

# Post install will fix SSR issue with depencies packages
RUN npm run ngcc

# Build Project
RUN npm run build-server

# Define working directory.
WORKDIR /var/www/

ENTRYPOINT ["/entrypoint.sh"]
