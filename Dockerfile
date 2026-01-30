FROM node:20-alpine

WORKDIR /app

RUN apk update && apk add --no-cache openssl

COPY package.json package-lock.json ./

COPY prisma ./prisma/

RUN npm ci --only=production

RUN npx prisma generate

COPY . .

EXPOSE 4000

CMD ["sh", "-c", "npx prisma db push && npm start"]