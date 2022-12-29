FROM node:18
WORKDIR /server
ENV NODE_ENV=testing
ENV DATABASE_URL="mysql://root:root@0.0.0.0:3306/FakeStore"
EXPOSE 5000
COPY . .
RUN npm install pm2 -g
RUN pm2 install typescript
CMD ["pm2-runtime", "index.ts"]