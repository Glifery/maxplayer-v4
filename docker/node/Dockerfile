FROM node:12

ENV TERM=xterm

RUN apt-get update && apt-get install -y default-jre vim

RUN apt-get -y autoremove && apt-get clean && apt-get autoclean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

RUN npm config set unsafe-perm=true && npm install -g serverless jscs mocha sequelize-cli