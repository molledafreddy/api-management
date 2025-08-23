# FROM node:22-bullseye
#Build stage
FROM node:18-bullseye as build


RUN npm cache clean --force
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

# Usar ARG para que Railway pueda pasar el valor durante la construcción
# Usar ENV para que el valor sea una variable de entorno en el contenedor


RUN npm run build

#Production stage
FROM node:18-bullseye AS production

#ARG DB_URI
ENV DB_URI="mongodb+srv://molledafreddy:magallanes2721.@cluster0.1e16p.mongodb.net/app-manager?retryWrites=true&w=majority&appName=Cluster0"
#RUN echo "La variable de entorno es: $DB_URI"

WORKDIR /

# Usar ARG para que Railway pueda pasar el valor durante la construcción

# Usar ENV para que el valor sea una variable de entorno en el contenedor

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/dist ./


EXPOSE 8080


CMD ["node", "app.js"]




