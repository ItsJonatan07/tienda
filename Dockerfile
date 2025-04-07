FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Ahora Prisma sí podrá encontrar schema.prisma
RUN npx prisma generate

EXPOSE 3000
CMD ["node", "src/server.js"]
