FROM node:lts
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install
RUN npm audit fix
CMD ["npm", "start"]