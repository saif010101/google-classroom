FROM node:25.9.0

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["sh","-c","npm run migrate up && npx nodemon"]
