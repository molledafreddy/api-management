# FROM node:22-bullseye
FROM node:18-bullseye
    
RUN npm cache clean --force

WORKDIR /app
COPY package*.json ./

COPY . .
RUN npm install


EXPOSE 8080

CMD [ "npm", "run", "start" ]