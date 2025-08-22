# FROM node:22-bullseye
#Build stage
FROM node:18-bullseye as build
    
RUN npm cache clean --force

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

# Usar ARG para que Railway pueda pasar el valor durante la construcción
ARG DB_URI
# Usar ENV para que el valor sea una variable de entorno en el contenedor
ENV DB_URI=$DB_URI

RUN npm run build

#Production stage
FROM node:18-bullseye AS production

WORKDIR /

# Usar ARG para que Railway pueda pasar el valor durante la construcción
ARG DB_URI
# Usar ENV para que el valor sea una variable de entorno en el contenedor
ENV DB_URI=$DB_URI

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/dist ./

EXPOSE 8080


CMD ["node", "app.js"]




