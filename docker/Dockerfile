FROM node:22-alpine
RUN apk add --no-cache make gcc g++ python3 git openssh

WORKDIR /uniswap-v2-subgraph

COPY docker/package*.json ./

COPY abis ./abis
COPY src ./src
COPY scripts ./scripts
COPY config ./config
COPY .env ./env
COPY v2-subgraph.template.yaml ./
COPY tsconfig.json ./

RUN npm install

ENTRYPOINT ["npm", "run"]