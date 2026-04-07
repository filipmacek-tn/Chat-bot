FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY src ./src
COPY index.html ./
COPY vite.config.ts ./
COPY tsconfig.json ./
CMD ["npm", "run", "dev"]
