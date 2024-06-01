FROM node:22
WORKDIR /app
# From now on, everything will be executed in /app directory
COPY ./package.json .
RUN npm install
COPY ./src ./src
COPY ./index.html .
COPY ./vite.config.ts .
COPY ./tsconfig.json .
RUN npm run build
CMD ["npm", "start"]
EXPOSE 5173