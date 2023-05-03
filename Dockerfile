FROM --platform=linux/amd64 node:14-alpine

RUN rm -rf build

RUN npm cache clean --force

RUN rm -rf node_modules

# RUN npm install -g ts-node ts-express
RUN npm install -g typescript
# RUN npm run tsc

# WORKDIR /app
WORKDIR /app

# COPY . /app
COPY package*.json ./

COPY . .

ENV DB_URI=mongodb+srv://molledafreddy:freddy2..@cluster0.1e16p.mongodb.net/app-manager

RUN npm install

# ENV NODE_ENV=production

EXPOSE 3002

CMD [ "npm", "run", "start" ]