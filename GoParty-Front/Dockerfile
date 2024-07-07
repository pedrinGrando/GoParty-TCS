# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app .

EXPOSE 5173

CMD ["npm", "start"]