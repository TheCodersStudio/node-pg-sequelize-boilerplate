FROM node:16

# Create app directory
# Copy files as a non-root user. The `node` user is built in the Node image.
WORKDIR /src
RUN chown node:node ./
USER node

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Bundle app source
COPY ./src ./

EXPOSE 8080
CMD [ "npm", "start" ]
