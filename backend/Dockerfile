# Creating multi-stage build for production
FROM node:20-alpine as build
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1
# Install bun.js CLI
RUN npm install -g bun
ENV NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json bun.lockb ./
RUN bun global add node-gyp
RUN bun config set network-timeout 600000 -g && bun install --production
ENV PATH=/opt/node_modules/.bin:$PATH
WORKDIR /opt/app
COPY . .
RUN bun build

# Creating final production image
FROM node:20-alpine
RUN apk add --no-cache vips-dev
ENV NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=build /opt/app ./
ENV PATH=/opt/node_modules/.bin:$PATH

RUN chown -R node:node /opt/app
USER node
EXPOSE 1337
CMD ["bun", "start"]