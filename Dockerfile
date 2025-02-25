
FROM oven/bun:1.0.35


WORKDIR /app


COPY package.json ./
COPY bun.lockb ./


RUN bun install


COPY . .

ENV PORT=5000 \
    DATABASE_URL=${POSTGRES_DATABASE_URL} \
    GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID} \
    GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET} \
    GOOGLE_REDIRECT_URI=${GOOGLE_REDIRECT_URI} \
    JWT_SECRET=${JWT_SECRET}



RUN bunx prisma generate --schema=./src/prisma/schema.prisma


EXPOSE 5000


CMD ["bun", "src/index.ts"] 