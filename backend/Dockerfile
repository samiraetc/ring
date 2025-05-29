# Etapa de build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa de produção
FROM node:18

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/seeds ./seeds

ENV NODE_ENV=production

# Instala prisma globalmente para garantir comandos prisma disponíveis
RUN npm install -g prisma

# Garante que as variáveis de ambiente sejam passadas ao rodar o container

# Executa os comandos necessários antes de iniciar o servidor
CMD npx prisma generate --schema=./prisma/schema.prisma && \
    npx prisma db push --schema=./prisma/schema.prisma && \
    npm run seeds && \
    node dist/server.js
