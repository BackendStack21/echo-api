FROM node:18-alpine 
RUN apk add --no-cache tini

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY index.js .

RUN npm install --production

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "index.js"]