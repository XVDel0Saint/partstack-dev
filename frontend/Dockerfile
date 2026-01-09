FROM node:20-alpine

WORKDIR /app

# copy package files first for better caching
COPY package*.json ./
RUN npm install

# copy the rest of the code
COPY . .

# build the app (for production)
# for dev mode, just change this to CMD ["npm", "run", "dev"]
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]