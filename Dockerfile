FROM node:current-alpine

# set app directory
WORKDIR /src/app

# install node modules
ADD package*.json /src/app
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

COPY . .
RUN mkdir ./data

EXPOSE 80
CMD [ "node", "app.js" ]
