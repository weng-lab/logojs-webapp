# base image
FROM node:10.16-alpine

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
WORKDIR /usr/src/app
COPY package.json ./
COPY . .
RUN yarn
RUN yarn build
RUN yarn global add serve

# start app
CMD ["node", "server.js"]
