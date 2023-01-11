FROM node:18
ENV NODE_ENV=testing
ENV DATABASE_URL="mysql://root:root@http://host.docker.internal:3306/FakeStore"
EXPOSE 5000
COPY . .
RUN npm install pm2 -g
RUN pm2 install typescript
RUN npm install
RUN npm run prisma:migrate
RUN npm run prisma:seed
RUN pm2-runtime index.ts