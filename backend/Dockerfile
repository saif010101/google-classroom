FROM node:25.9.0 AS builder 
WORKDIR /app 
COPY package.json .
RUN npm install 
COPY . . 
RUN npm run build
EXPOSE 3000

FROM node:25.9.0
WORKDIR /app
COPY package.json .
RUN npm install
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/utils ./utils 
EXPOSE 3000
CMD ["sh","-c","npm run migrate up && node dist/server.js"]
