# base image
FROM node:10.16-alpine

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV PORT 80

# install and cache app dependencies
WORKDIR /usr/src/app
COPY package.json ./
COPY . .
RUN yarn
RUN yarn build

# start app
EXPOSE 80
CMD ["node", "server.js"]
