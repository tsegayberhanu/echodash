FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

ARG NODE_ENV=production
RUN if [ "$NODE_ENV" = "production" ]; then npm ci --omit=dev; else npm ci; fi

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
