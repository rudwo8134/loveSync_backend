FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# yarn install을 npm install로 변경
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# yarn start:prod를 npm run start:prod로 변경
CMD ["npm", "run", "start:prod"] 