FROM node:20-alpine

WORKDIR /app

RUN apk update && apk add --no-cache openssl

COPY package.json package-lock.json ./

COPY prisma ./prisma/

RUN npm ci

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN npx prisma generate

RUN npm prune --omit=dev

EXPOSE 4000

CMD ["sh", "-c", "npx prisma db push && npm start"]