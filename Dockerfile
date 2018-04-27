# base image
FROM node:9.6.1

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
CMD ["serve", "-s", "build"]
