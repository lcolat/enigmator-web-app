# base image
FROM node:latest
RUN mkdir /usr/src/app
RUN mkdir /usr/src/app/build
WORKDIR /usr/src/app
COPY build/ /usr/src/app/build
RUN npm install -g serve
# start app
CMD ["serve", "-s", "build", "-l", "8080"]