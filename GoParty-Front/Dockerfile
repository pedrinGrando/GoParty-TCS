# Estágio de construção
FROM node:alpine as builder

# Defina o diretório de trabalho no container de construção
# Estágio 1
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2
FROM node:alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
EXPOSE 3000
CMD ["npm", "start"]
