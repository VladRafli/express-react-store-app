FROM node:18
ENV NODE_ENV=testing
ENV DATABASE_URL="mysql://root:root@172.17.0.1:3306/FakeStore"
EXPOSE 5000
COPY . .
RUN npm install pm2 -g
RUN pm2 install typescript
RUN npm install
RUN npx prisma migrate dev --name init
RUN npm run prisma:migrate
RUN npm run prisma:seed
RUN pm2-runtime index.ts