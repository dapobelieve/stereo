FROM node:16-alpine
RUN apk update && apk add bash

WORKDIR /usr/src/app/

##Copy package.json and package-lock to enjoy caching
COPY package*.json ./

RUN npm install knex -g

RUN npm ci

COPY . .

RUN npm prune

# copy scripts to bin and make them executable
COPY ./scripts/start.sh /usr/local/bin/start.sh

RUN chmod +x -R /usr/local/bin

EXPOSE 5000

ENTRYPOINT ["start.sh"]
