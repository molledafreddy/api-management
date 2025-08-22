# FROM node:22-bullseye
#Build stage
FROM node:18-bullseye as build
    
RUN npm cache clean --force

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

#Production stage
FROM node:18-bullseye AS production

WORKDIR /app
# Specify the variable you need
ARG DB_URI
# Use the variable
RUN echo $DB_URI

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/dist ./

EXPOSE 8080


CMD ["node", "app.js"]




