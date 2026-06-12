FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install --include=optional
RUN npm install --platform=linux --arch=arm64 sharp
RUN npm run build

EXPOSE 3172

CMD ["npm", "start"]
